// This is a jest file that DOES NOT contain relevant tests functions
// The following test the function add - Eskabore
function add(a, b) {
    return a + b;
}

test('adds two numbers', () => {
    const result = add(1, 2);
    expect(result).toBe(3);
});