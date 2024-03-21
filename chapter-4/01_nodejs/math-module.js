function hitungLuasLingkaran(r) {
    return Math.PI * r * r;
}

module.exports = {
    hitungLuasLingkaran,
    hitungKelilingLingkaran: (r) => {
        return 2 * Math.PI * r;
    }
};