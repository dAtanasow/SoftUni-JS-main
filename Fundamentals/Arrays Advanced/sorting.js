//Write a function that sorts an array of numbers so that the first element is the biggest one, the second is the
//smallest one, the third is the second biggest one, and the fourth is the second smallest one, and so on.
//Print the elements on one row, separated by a single space.

function sorting(nums) {
    let sortedArr = nums.sort((a, b) => a - b);
    let finalArr = []

    while (sortedArr.length > 0) {
        let maxNum = sortedArr.pop()
        finalArr.push(maxNum)
        if (sortedArr.length > 0) {
            let minNum = sortedArr.shift()
            finalArr.push(minNum)
        }
    }
    console.log(finalArr.join(' '));
}

sorting([1, 21, 3, 52, 69, 63, 31,
    2, 18, 94])
sorting([34, 2, 32, 45, 690, 6, 32,
    7, 19, 47]
)