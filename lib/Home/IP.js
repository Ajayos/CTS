/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 15-6-2023
 * @editor : Ajayos
 * @file : IP.js
 * @path : /lib/Home/IP.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

/**
 * 
 * Retrieves IP information from ipapi.co API.
 *
 * @param {string} ip - The IP address to fetch information for.
 * @returns {Object} - The IP information response object.
 * -
 * - const ip = require(path);
 *
 * - const { data, message, error, status } = ip(ipaddress)
 */
const _0x229276 = _0x1d5d;
function _0x1d5d(_0x335582, _0x2a9d46) {
  const _0x79251d = _0x7925();
  return (
    (_0x1d5d = function (_0x1d5d57, _0x44e707) {
      _0x1d5d57 = _0x1d5d57 - 0x106;
      let _0x5aff10 = _0x79251d[_0x1d5d57];
      return _0x5aff10;
    }),
    _0x1d5d(_0x335582, _0x2a9d46)
  );
}
(function (_0x468458, _0x39922a) {
  const _0x24643e = _0x1d5d,
    _0x4d51a7 = _0x468458();
  while (!![]) {
    try {
      const _0x836e5b =
        -parseInt(_0x24643e(0x10b)) / 0x1 +
        (-parseInt(_0x24643e(0x114)) / 0x2) *
          (-parseInt(_0x24643e(0x106)) / 0x3) +
        (parseInt(_0x24643e(0x113)) / 0x4) *
          (parseInt(_0x24643e(0x107)) / 0x5) +
        -parseInt(_0x24643e(0x108)) / 0x6 +
        (parseInt(_0x24643e(0x109)) / 0x7) *
          (parseInt(_0x24643e(0x10d)) / 0x8) +
        (parseInt(_0x24643e(0x10a)) / 0x9) *
          (parseInt(_0x24643e(0x10c)) / 0xa) +
        -parseInt(_0x24643e(0x10e)) / 0xb;
      if (_0x836e5b === _0x39922a) break;
      else _0x4d51a7["push"](_0x4d51a7["shift"]());
    } catch (_0xcf2554) {
      _0x4d51a7["push"](_0x4d51a7["shift"]());
    }
  }
})(_0x7925, 0x9602f);
const axios = require(_0x229276(0x111));
async function getIp(_0x1c7e17) {
  const _0x7f121 = _0x229276,
    _0x14298c = await axios[_0x7f121(0x10f)](
      "https://ipapi.co/" + _0x1c7e17 + _0x7f121(0x112)
    ),
    _0x34652f = _0x14298c[_0x7f121(0x110)];
  if (_0x34652f[_0x7f121(0x116)])
    return {
      status: 0x194,
      message: "Invalid\x20IP\x20Address",
      error: !![],
      data: undefined,
    };
  return {
    status: 0xc8,
    message: undefined,
    error: ![],
    data: _0x34652f,
  };
}
function _0x7925() {
  const _0x536491 = [
    "990012rQUgsM",
    "1052620YoZmqz",
    "7528648xjlfZR",
    "18307047QfAVAE",
    "get",
    "data",
    "axios",
    "/json/",
    "4565764oCnlXF",
    "6aLdhxC",
    "exports",
    "error",
    "1001271xfDwNN",
    "5oxEhWX",
    "785058DSpBNV",
    "7DoMJFY",
    "27FLfWCi",
  ];
  _0x7925 = function () {
    return _0x536491;
  };
  return _0x7925();
}
module[_0x229276(0x115)] = getIp;