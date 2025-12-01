// Given an integer array nums sorted in non-decreasing order,
// return an array of the squares of each number sorted in non-decreasing order.
//
// Example:
// Input:  nums = [-4, -1, 0, 3, 10]
// Output: [0, 1, 9, 16, 100]

#include <iostream>
#include <vector>
using namespace std;

// Function to return sorted squares
vector<int> sortedSquares(vector<int>& nums) {
    int n = nums.size();
    int start = 0;
    int end = n - 1;
    int k = n - 1;

    vector<int> ans(n);

    while (start <= end) {
        int leftSq = nums[start] * nums[start];
        int rightSq = nums[end] * nums[end];

        if (leftSq > rightSq) {
            ans[k] = leftSq;
            start++;
        } else {
            ans[k] = rightSq;
            end--;
        }
        k--;
    }

    return ans;
}

int main() {
    vector<int> nums = {-4, -1, 0, 3, 10};

    vector<int> result = sortedSquares(nums);

    cout << "Sorted squares: ";
    for (int x : result) {
        cout << x << " ";
    }
    cout << endl;

    return 0;
}
