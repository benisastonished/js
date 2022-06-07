binarysearch(arr, n, k) {        
       let l = 0;
       let r = n - 1;
       let mid;
       
       while(r >= 1){
           mid = l + Math.floor((r-l)/2)
           if(arr[mid] == k){
               return mid
           }
           else if(arr[mid] > k){
               r = mid-1
           }
           else{
               l = mid + 1
           }
       }
       return -1
    }
}
