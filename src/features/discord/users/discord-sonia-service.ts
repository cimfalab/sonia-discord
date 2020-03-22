import { MessageEmbedAuthor } from 'discord.js';
import _ from 'lodash';
import { getRandomValueFromEnum } from '../../../functions/get-random-value-from-enum';
import { DiscordClientService } from '../discord-client-service';
import { DiscordSoniaConfigService } from './discord-sonia-config-service';
import { DiscordSoniaMentalStateEnum } from './enums/discord-sonia-mental-state.enum';
import { isDiscordClientUser } from './functions/is-discord-client-user';
import { Sonia } from './types/sonia';

export class DiscordSoniaService {
  private static _instance: DiscordSoniaService;

  public static getInstance(): DiscordSoniaService {
    if (_.isNil(DiscordSoniaService._instance)) {
      DiscordSoniaService._instance = new DiscordSoniaService();
    }

    return DiscordSoniaService._instance;
  }

  private readonly _discordClientService = DiscordClientService.getInstance();
  private readonly _discordSoniaConfigService = DiscordSoniaConfigService.getInstance();

  public isSonia(id: Readonly<string>): boolean {
    return _.isEqual(id, this._discordSoniaConfigService.getId());
  }

  public getSonia(): Sonia | null {
    return this._discordClientService.getClient().user;
  }

  public getSoniaFullName(): string | null {
    const sonia: Sonia | null = this.getSonia();

    if (!_.isNil(sonia)) {
      return `${sonia.username}#${sonia.discriminator}`;
    }

    return null;
  }

  public isValid(sonia: unknown): sonia is Sonia {
    return isDiscordClientUser(sonia);
  }

  public getCorporationMessageEmbedAuthor(): MessageEmbedAuthor {
    return this._discordSoniaConfigService.getCorporationMessageEmbedAuthor();
  }

  public getMentalState(): DiscordSoniaMentalStateEnum {
    return getRandomValueFromEnum(DiscordSoniaMentalStateEnum);
  }
}