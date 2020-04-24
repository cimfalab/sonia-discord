import { Client } from "discord.js";
import _ from "lodash";
import { AbstractService } from "../../../../classes/abstract.service";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { wrapInQuotes } from "../../../../functions/formatters/wrap-in-quotes";
import { ChalkService } from "../../../logger/services/chalk.service";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";

export class DiscordGuildService extends AbstractService {
  private static _instance: DiscordGuildService;

  public static getInstance(): DiscordGuildService {
    if (_.isNil(DiscordGuildService._instance)) {
      DiscordGuildService._instance = new DiscordGuildService();
    }

    return DiscordGuildService._instance;
  }

  public readonly discordClient: Client = DiscordClientService.getInstance().getClient();
  private readonly _loggerService: LoggerService = LoggerService.getInstance();
  private readonly _chalkService: ChalkService = ChalkService.getInstance();

  protected constructor() {
    super(ServiceNameEnum.DISCORD_GUILD_SERVICE);
    this.init();
  }

  public init(): void {
    this._listen();
  }

  private _listen(): void {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.discordClient.on(`ready`, (): void => {});

    this._loggerService.debug({
      context: this._serviceName,
      message: this._chalkService.text(`listen ${wrapInQuotes(`ready`)} event`),
    });
  }
}