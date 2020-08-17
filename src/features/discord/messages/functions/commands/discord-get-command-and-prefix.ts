import { DiscordMessageCommandEnum } from "../../enums/command/discord-message-command.enum";
import { IDiscordGetCommandAndPrefixData } from "../../interfaces/commands/discord-get-command-and-prefix-data";
import { discordExtractFromCommand } from "./discord-extract-from-command";
import { discordGetFormattedMessage } from "./discord-get-formatted-message";
import { discordGetThisCommandWithPrefix } from "./discord-get-this-command-with-prefix";

function getCommandAndPrefix(data: {
  command: DiscordMessageCommandEnum;
  message: string;
  prefix: string;
}): string | null {
  return discordGetThisCommandWithPrefix({
    command: data.command,
    message: data.message,
    prefix: data.prefix,
  });
}

export function discordGetCommandAndPrefix(
  data: Readonly<IDiscordGetCommandAndPrefixData>
): string | null {
  return discordExtractFromCommand({
    callback: getCommandAndPrefix,
    commands: data.commands,
    message: discordGetFormattedMessage(data.message),
    prefixes: data.prefixes,
  });
}
