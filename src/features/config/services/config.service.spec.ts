import { ILoggerLog } from "../../logger/interfaces/logger-log";
import { LoggerService } from "../../logger/services/logger.service";
import { IConfigUpdateBoolean } from "../interfaces/config-update-boolean";
import { IConfigUpdateNumber } from "../interfaces/config-update-number";
import { IConfigUpdateString } from "../interfaces/config-update-string";
import { ConfigService } from "./config.service";

jest.mock(`../../logger/services/chalk.service`);
jest.mock(`../../logger/services/logger.service`);

describe(`ConfigService`, (): void => {
  let service: ConfigService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    service = ConfigService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getUpdatedNumber()`, (): void => {
    let configUpdateNumber: IConfigUpdateNumber;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateNumber = {
        context: `dummy-context`,
        newValue: 0,
        oldValue: 8,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update number new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(8);
      });
    });

    describe(`when the given config update number new value is 5`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = 5;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-5`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(5);
      });
    });

    describe(`when the given config update number new value is 6`, (): void => {
      beforeEach((): void => {
        configUpdateNumber.newValue = 6;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedNumber(configUpdateNumber);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-6`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedNumber(configUpdateNumber);

        expect(result).toStrictEqual(6);
      });
    });
  });

  describe(`getUpdatedString()`, (): void => {
    let configUpdateString: IConfigUpdateString;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateString = {
        context: `dummy-context`,
        newValue: `dummy-new-value`,
        oldValue: `dummy-old-value`,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update string new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedString(configUpdateString);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedString(configUpdateString);

        expect(result).toStrictEqual(`dummy-old-value`);
      });
    });

    describe(`when the given config update string new value is "new-value"`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = `new-value`;
      });

      describe(`when the given config update string value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = undefined;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = false;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"new-value"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });

      describe(`when the given config update string value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = true;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`new-value`);
        });
      });
    });

    describe(`when the given config update string new value is "marco-polo"`, (): void => {
      beforeEach((): void => {
        configUpdateString.newValue = `marco-polo`;
      });

      describe(`when the given config update string value hidden state is undefined`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = undefined;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string value hidden state is false`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = false;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log without the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `text-dummy-value-name updated to: value-"marco-polo"`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });

      describe(`when the given config update string value hidden state is true`, (): void => {
        beforeEach((): void => {
          configUpdateString.isValueHidden = true;
        });

        describe(`when the given config update string value display state is undefined`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = undefined;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is false`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = false;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        describe(`when the given config update string value display state is true`, (): void => {
          beforeEach((): void => {
            configUpdateString.isValueDisplay = true;
          });

          it(`should log and hide the value`, (): void => {
            expect.assertions(2);

            service.getUpdatedString(configUpdateString);

            expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).toHaveBeenCalledWith({
              context: `dummy-context`,
              message: `dummy-value-name updated to: "********" (hidden)`,
            } as ILoggerLog);
          });
        });

        it(`should return the new value`, (): void => {
          expect.assertions(1);

          const result = service.getUpdatedString(configUpdateString);

          expect(result).toStrictEqual(`marco-polo`);
        });
      });
    });
  });

  describe(`getUpdatedBoolean()`, (): void => {
    let configUpdateBoolean: IConfigUpdateBoolean;

    let loggerServiceLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      configUpdateBoolean = {
        context: `dummy-context`,
        newValue: true,
        oldValue: false,
        valueName: `dummy-value-name`,
      };

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
    });

    describe(`when the given config update boolean new value is undefined`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = undefined;
      });

      it(`should not log`, (): void => {
        expect.assertions(1);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should return the old value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedBoolean(configUpdateBoolean);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given config update boolean new value is false`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = false;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-false`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedBoolean(configUpdateBoolean);

        expect(result).toStrictEqual(false);
      });
    });

    describe(`when the given config update boolean new value is true`, (): void => {
      beforeEach((): void => {
        configUpdateBoolean.newValue = true;
      });

      it(`should log`, (): void => {
        expect.assertions(2);

        service.getUpdatedBoolean(configUpdateBoolean);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `dummy-context`,
          message: `text-dummy-value-name updated to: value-true`,
        } as ILoggerLog);
      });

      it(`should return the new value`, (): void => {
        expect.assertions(1);

        const result = service.getUpdatedBoolean(configUpdateBoolean);

        expect(result).toStrictEqual(true);
      });
    });
  });
});