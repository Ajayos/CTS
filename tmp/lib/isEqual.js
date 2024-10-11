/**
 *
 * @project : CTS
 * @version : 12.5.3
 * @link : https://github.com/Ajayos/CTS
 * @author : Ajay o s
 * @created : 14-6-2023
 * @modified : 16-6-2023
 * @editor : Ajayos
 * @file : isEqual.js
 * @path : /lib/isEqual.js
 *
 * GitHub Repository: https://github.com/Ajayos/CTS
 *
 * All rights reserved. (C) 2023 Ajayos
 */

/**
 * Checks if two strings are equal character by character.
 * @param {string} a - The first string.
 * @param {string} b - The second string.
 * @returns {boolean} - True if the strings are equal, false otherwise.
 */

function _0x7fe8() {
	const _0x47ad04 = [
		'90oZHUmf',
		'346797hzJEzN',
		'12FiQIhU',
		'exports',
		'1921539XNxCCM',
		'2TXAimY',
		'10957045enGRvH',
		'length',
		'21HyOhck',
		'662705vjuwTW',
		'1379844Lppclt',
		'charCodeAt',
		'1742280btgCud',
		'493791LvoUMr',
	];
	_0x7fe8 = function () {
		return _0x47ad04;
	};
	return _0x7fe8();
}
function _0x535e(_0x11f244, _0x3fbff5) {
	const _0x7fe8c6 = _0x7fe8();
	return (
		(_0x535e = function (_0x535e76, _0x1414a1) {
			_0x535e76 = _0x535e76 - 0x19c;
			let _0x1e8aca = _0x7fe8c6[_0x535e76];
			return _0x1e8aca;
		}),
		_0x535e(_0x11f244, _0x3fbff5)
	);
}
const _0x2f332c = _0x535e;
(function (_0x381427, _0x2085f8) {
	const _0x516ec3 = _0x535e,
		_0x529443 = _0x381427();
	while (!![]) {
		try {
			const _0x452604 =
				parseInt(_0x516ec3(0x1a8)) / 0x1 +
				(parseInt(_0x516ec3(0x1a0)) / 0x2) *
					(-parseInt(_0x516ec3(0x19f)) / 0x3) +
				parseInt(_0x516ec3(0x1a5)) / 0x4 +
				(parseInt(_0x516ec3(0x1a4)) / 0x5) *
					(parseInt(_0x516ec3(0x19d)) / 0x6) +
				(-parseInt(_0x516ec3(0x1a3)) / 0x7) *
					(parseInt(_0x516ec3(0x1a7)) / 0x8) +
				(parseInt(_0x516ec3(0x19c)) / 0x9) *
					(-parseInt(_0x516ec3(0x1a9)) / 0xa) +
				parseInt(_0x516ec3(0x1a1)) / 0xb;
			if (_0x452604 === _0x2085f8) break;
			else _0x529443['push'](_0x529443['shift']());
		} catch (_0xcde207) {
			_0x529443['push'](_0x529443['shift']());
		}
	}
})(_0x7fe8, 0x70200);
function isEqual(_0x28856b, _0x3aafb6) {
	const _0x56e347 = _0x535e;
	if (_0x28856b['length'] !== _0x3aafb6['length']) return ![];
	let _0x2d5d8e = 0x0;
	for (
		let _0x2719a4 = 0x0;
		_0x2719a4 < _0x28856b[_0x56e347(0x1a2)];
		++_0x2719a4
	) {
		_0x2d5d8e |=
			_0x28856b[_0x56e347(0x1a6)](_0x2719a4) ^
			_0x3aafb6['charCodeAt'](_0x2719a4);
	}
	return _0x2d5d8e === 0x0;
}
module[_0x2f332c(0x19e)] = isEqual;
