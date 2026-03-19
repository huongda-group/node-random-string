import assert from "assert";
import randomstring from "../dist/index.mjs";

describe("ESM import", function() {

  it("default export is the generate function", function() {
    assert.equal(typeof randomstring, "function");
  });

  it("default export returns a string", function() {
    var result = randomstring();
    assert.equal(typeof result, "string");
    assert.equal(result.length, 32);
  });

  it("default export accepts length", function() {
    var result = randomstring(7);
    assert.equal(typeof result, "string");
    assert.equal(result.length, 7);
  });

  it("default export accepts options", function() {
    var result = randomstring({ length: 12, charset: "alphabetic" });
    assert.equal(result.length, 12);
    assert.equal(result.search(/\d/), -1);
  });

  it("default export works with callback", function(done) {
    randomstring({ length: 16 }, function(err, result) {
      assert.equal(err, null);
      assert.equal(typeof result, "string");
      assert.equal(result.length, 16);
      done();
    });
  });
});
