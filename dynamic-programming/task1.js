// Вы управляете строительством рекламных щитов на дороге с интенсивным движением, идущей с запада на восток на протяжении M миль. Возможные точки для установки рекламных щитов определяются числами x1, x2, ..., xn, каждое из которых принадлежит интервалу [0, M] (эти числа определяют позицию в милях от западного конца дороги). Разместив рекламный щит в точке х, вы получите прибыль ri > 0.
// По правилам дорожной службы округа два рекламных щита не могут находиться на расстоянии 5 миль и менее. Требуется разместить рекламные щиты на подмножестве точек так, чтобы обеспечить максимальную прибыль с учетом ограничения.
// Пример. Предположим, M = 20, n = 4, {x1, x2, x3, x4} = {6, 7, 12, 14}, и {r1, r2, r3, r4} = = {5, 6, 5, 1}. В оптимальном решении рекламные щиты размещаются в точках x1 и x3, с суммарной прибылью 10.
// Предложите алгоритм, который получает экземпляр этой задачи и возвращает максимальную суммарную прибыль, которая может быть получена для любого действительного подмножества точек. Время выполнения алгоритма должно быть полиномиальным по n.

const Billboard = require('./billboard.js'),
    fs = require('fs'),
    inputData=[];

require('readline')
    .createInterface({
        input: fs.createReadStream('input.txt')
    })
    .on('line', (line) => inputData.push(line.split(' ').map( (item) => parseInt(item, 10))))
    .on('close', () =>  {
        const outFile = fs.openSync('output.txt', 'w'),
              outData = new Billboard(inputData[0], inputData[1]).findMaximumTotalIncome();
              // inputData[0] - position, inputData[1] - income
        fs.write(outFile, outData);
        process.exit(0);
    });
