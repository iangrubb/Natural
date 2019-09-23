
const sentenceEquality = (x, y) => {
    if (x.type === "atom" && y.type === "atom") {
        return x.letter === y.letter
    } else if (x.type === "contradiction" && y.type === "contradiction") {
        return true
    } else if (x.type === "negation" && y.type === "negation") {
        return sentenceEquality(x.right, y.right)
    } else if (x.type === y.type) {
        return sentenceEquality(x.left, y.left) && sentenceEquality(x.right, y.right)
    } else {
        return false
    }
}

export default sentenceEquality