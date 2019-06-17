function decimalAdjust(type, value, exp) {
    if (typeof exp === 'undefined' || +exp === 0) {
        return Math[type](value);
    }

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
        return NaN;
    }

    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));

    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
}

module.exports = {
    round: (value, exp) => {
        return decimalAdjust('round', value, exp);
    },

    roundDown: (value, exp) => {
        return decimalAdjust('floor', value, exp);
    },

    roundUp: (value, exp) => {
        return decimalAdjust('ceil', value, exp);
    },

    format: (number, precision, decimalSeparator, thousandsSeparator) => {
        var precision = isNaN(precision = Math.abs(precision)) ? 2 : precision,
            decimalSeparator = typeof decimalSeparator === 'undefined' ? '.' : decimalSeparator,
            thousandsSeparator = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator,
            s = number < 0 ? '-' : '',
            i = parseInt(number = Math.abs(+number || 0).toFixed(precision)) + '',
            j = (j = i.length) > 3 ? j % 3 : 0;

        return s + (j ? i.substr(0, j) + thousandsSeparator : '')
            + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandsSeparator)
            + (precision ? decimalSeparator + Math.abs(number - i).toFixed(precision).slice(2) : '');
    }
};