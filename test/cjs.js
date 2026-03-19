"use strict";

var assert = require("assert");
var randomstring = require("..").default;

describe("CJS require", function() {

  it("default export is the generate function", function() {
    assert.equal(typeof randomstring, "function");
  });

  it("default export returns a string", function() {
    var result = randomstring();
    assert.equal(typeof result, "string");
    assert.equal(result.length, 32);
  });

  it("default export accepts options", function() {
    var result = randomstring({ length: 10, charset: "numeric" });
    assert.equal(result.length, 10);
    assert.equal(result.search(/\D/), -1);
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
