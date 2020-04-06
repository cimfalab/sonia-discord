import { DiscordMessageConfigValueNameEnum } from "./discord-message-config-value-name.enum";

describe(`DiscordMessageConfigValueNameEnum`, (): void => {
  it(`should have a member "COMMAND_ERROR_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_COLOR
    ).toStrictEqual(`message command error image color`);
  });

  it(`should have a member "COMMAND_ERROR_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_URL
    ).toStrictEqual(`message command error image url`);
  });

  it(`should have a member "COMMAND_VERSION_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_COLOR
    ).toStrictEqual(`message command version image color`);
  });

  it(`should have a member "COMMAND_VERSION_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(
      DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_URL
    ).toStrictEqual(`message command version image url`);
  });

  it(`should have a member "ERROR_IMAGE_COLOR"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.ERROR_IMAGE_COLOR).toStrictEqual(
      `message error image color`
    );
  });

  it(`should have a member "ERROR_IMAGE_URL"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageConfigValueNameEnum.ERROR_IMAGE_URL).toStrictEqual(
      `message error image url`
    );
  });
});