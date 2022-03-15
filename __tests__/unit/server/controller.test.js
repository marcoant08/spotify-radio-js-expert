import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import config from "../../../server/config.js";
import { handler } from "../../../server/routes.js";
import { Service } from "../../../server/service.js";
import TestUtil from "../_util/testUtil.js";
const { pages } = config;

describe("#controller - test suite for controller", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("GET /home - deve chamar a service com a path do homeHTML", async () => {
    const params = TestUtil.defaultHandleParams();
    params.request.method = "GET";
    params.request.url = "/home";
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest
      .spyOn(Service.prototype, Service.prototype.getFileStream.name)
      .mockResolvedValue({
        stream: mockFileStream,
      });

    await handler(...params.values());

    expect(Service.prototype.getFileStream).toBeCalledWith(pages.homeHTML);
  });
});
