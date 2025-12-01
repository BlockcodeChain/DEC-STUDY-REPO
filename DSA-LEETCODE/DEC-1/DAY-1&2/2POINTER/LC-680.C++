// iven a string s, return true if the s can be palindrome after deleting at most one character from it.
// Example 1:

// Input: s = "aba"
// Output: true
// Example 2:
// Input: s = "abca"
// Output: true
// Explanation: You could delete the character 'c'.

#include <iostream>
#include<vector>
using namespace std;
bool removelem(vector<char>&s,int start,int end){
  while(start<end){
    if(s[start]!=s[end]){
        return false;
    }
    start++;
    end--;
  }
  return true;
}
int main()
{
    vector<char>s={'a','b','c','a'};
    int size=s.size();
    int start=0,end=size-1;
    while(start<end){
        if(s[start]==s[end]){
            start++;
            end--;
        }
        else  {
            bool option1 = removelem(s, start + 1, end);  // delete left
            bool option2 = removelem(s, start, end - 1);  // delete right
            cout << (option1 || option2);
            return 0;
            // return removelem(s,start+1,end)||removelem(s,start,end-1);
            // return 0;
        }
    }
    cout<<"true";
    return 0;

}

