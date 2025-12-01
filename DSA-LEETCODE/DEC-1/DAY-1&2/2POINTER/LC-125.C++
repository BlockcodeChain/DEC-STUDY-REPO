// A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.
// Given a string s, return true if it is a palindrome, or false otherwise.

// Input: s = "A man, a plan, a canal: Panama"
//  Output: true
// Explanation: "amanaplanacanalpanama" is a palindrome.


#include <iostream>
using namespace std;
int main(){
  string s="A man, a plan, a canal: Panama";
  int size=s.size();
  int start=0,end=size-1;
  while(start<end){
    if(!isalnum(s[start])) 
    {start++; 
    continue;
    }
   if(!isalnum(s[end])) {
    end--;
    continue;
   }
    if(tolower(s[start])!=tolower(s[end]))
        {
            cout<<"false";
            return 0;
        }
    
    start++;
    end--;
  }
  cout<<"true";
  return 0;
}