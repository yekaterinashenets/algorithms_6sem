module.exports = class Billboard {
    constructor(position, income) {
        this.income = income;
        this.position = position;
    }

    findMaximumTotalIncome() {
        let sum = new Array(0, this.income[0]);

        for (let i = 2; i < this.position.length; i++) {
            sum.push(Math.max(this.income[i] + sum[this.getNextBillboard(this.position, i)], sum[i - 1]))
        }

        return sum;
    }

    getNextBillboard(arr, index) {
        let current = arr[index];
        index--;
        while (current - arr[index] < 5) {
            index--;
        }

        return index;
    }

}