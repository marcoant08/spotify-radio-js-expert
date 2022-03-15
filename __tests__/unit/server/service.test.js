import { jest, expect, describe, test, beforeEach } from "@jest/globals";
import config from "../../../server/config.js";
import { handler } from "../../../server/routes.js";
import fs from "fs";
import fsPromises from "fs/promises";
import { join } from "path";
import TestUtil from "../_util/testUtil.js";
const { pages, dir } = config;

describe("#service - test suite for service", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("GET /home - deve chamar a fs com a path completa do homeHTML", async () => {
    const params = TestUtil.defaultHandleParams();
    params.request.method = "GET";
    params.request.url = "/home";
    const fullFilePath = join(dir.publicDirectory, pages.homeHTML);
    const mockFileStream = TestUtil.generateReadableStream(["data"]);

    jest.spyOn(fsPromises, fs.access.name).mockResolvedValue();
    jest.spyOn(fs, fs.createReadStream.name).mockResolvedValue(mockFileStream);

    await handler(...params.values());

    expect(fsPromises.access).toBeCalledWith(fullFilePath);
    expect(fs.createReadStream).toBeCalledWith(fullFilePath);
  });
});
