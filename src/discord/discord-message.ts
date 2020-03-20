import _ from 'lodash';
import {
  chalkError,
  chalkText
} from '../logger/chalk';
import { Logger } from '../logger/logger';
import { DiscordAuthor } from './discord-author';
import { DiscordChannel } from './discord-channel';
import { DiscordClient } from './discord-client';
import { DiscordMention } from './discord-mention';
import { DiscordSonia } from './discord-sonia';
import { AnyDiscordMessage } from './types/any-discord-message';
import { Sonia } from './types/sonia';

export class DiscordMessage {
  private static _instance: DiscordMessage;

  public static getInstance(): DiscordMessage {
    if (_.isNil(DiscordMessage._instance)) {
      DiscordMessage._instance = new DiscordMessage();
    }

    return DiscordMessage._instance;
  }

  private readonly _logger = Logger.getInstance();
  private readonly _client = DiscordClient.getInstance().getClient();
  private readonly _discordSonia = DiscordSonia.getInstance();
  private readonly _discordChannel = DiscordChannel.getInstance();
  private readonly _discordAuthor = DiscordAuthor.getInstance();
  private readonly _discordMention = DiscordMention.getInstance();
  private readonly _className = 'DiscordMessage';

  public constructor() {
    this._init();
  }

  private _init(): void {
    this._listen();
  }

  private _listen(): void {
    this._client.on('message', (message: Readonly<AnyDiscordMessage>): void => {
      this._handleMessage(message);
    });

    this._logger.debug(this._className, chalkText(`listen messages`));
  }

  private _handleMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordChannel.isValidChannel(message.channel)) {
      if (this._discordChannel.isDmChannel(message.channel)) {
        this._dmMessage(message);
      } else if (this._discordChannel.isTextChannel(message.channel)) {
        this._textMessage(message);
      }
    }
  }

  private _dmMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordSonia.isSonia(message.author.id)) {
        this._replyToAuthor(message);
      }
    }
  }

  private _textMessage(message: Readonly<AnyDiscordMessage>): void {
    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (!this._discordSonia.isSonia(message.author.id)) {
        console.log(message);
        if (this._discordMention.isValidMessageMentions(message.mentions)) {
          if (this._discordMention.isMentionForEveryone(message.mentions)) {
            this._sendMessage(message, 'Il est midi tout le monde !');
          } else {
            const sonia: Sonia | null = this._discordSonia.getSonia();

            if (this._discordSonia.isSoniaValid(sonia)) {
              if (this._discordMention.isUserMentioned(message.mentions, sonia)) {
                this._replyToAuthor(message);
              }
            }
          }
        }
      }
    }
  }

  private _replyToAuthor(message: Readonly<AnyDiscordMessage>): void {
    let response = 'Il est midi !';

    if (this._discordAuthor.isValidAuthor(message.author)) {
      if (this._discordAuthor.hasValidAuthorUsername(message.author)) {
        response = `Il est midi ${message.author.username} !`;
      }
    }

    this._sendMessage(message, response);
  }

  private _sendMessage(
    message: Readonly<AnyDiscordMessage>,
    response: Readonly<string>
  ): void {
    this._logger.debug(this._className, chalkText(`sending message...`));

    if (this._discordChannel.isValidChannel(message.channel)) {
      message.channel.send(response).then((): void => {
        this._logger.log(this._className, chalkText(`message sent`));
      }).catch((error: unknown): void => {
        this._logger.error(this._className, chalkText(`message sending failed`));
        this._logger.error(this._className, chalkError(error));
      });
    }
  }
}
