/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */

function ListNode(val, next) {
      this.val = (val===undefined ? 0 : val)
     this.next = (next===undefined ? null : next)
}
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  if(!head || !head.next){
    return head;
  }
  let fake = new ListNode(Infinity,head);
  head = fake;
  //2
  let next = null;
  let first = null;
  // [1,2,3,3,4,4,5]
  let per = null;
  while(head){
    next = head.next;
    while(next && head.val === next.val){
      next = next ? next.next : null;
      if(per){
        per.next = next;
      }
    }
    
    if(!first){
      if(head.next === next){
        // 1
        per = first = head
      }else{
        per = first = next;
        head = per;
      }
    }else{
      // 2
      per = head.next === next ? head : per;
      head = per.next;
    }
  }
  return first.next;
};
let node5 = new ListNode(4);
let node4 = new ListNode(3,node5);
let node3 = new ListNode(2,node4);
let node2 = new ListNode(1,node3);
let node1 = new ListNode(1,node2);
let nod = new ListNode(1,node1)
let node0 = new ListNode(0,nod);
// 1 2 3 3 4 5 5
// let result = deleteDuplicates(node0);
//console.log(JSON.stringify(result));


function map(head){
  let first = new ListNode(Infinity,head);
  let map = {};
  while(head && head.next){
    if(head.val === head.next.val){
      map[head.val] = '1';
    }
    head = head.next;
  }
  let next = first.next;
  let per = first;
  while(next){
    if(map[next.val] === '1'){
      per.next = next.next;
    }else{
      per = next;
    }
    next = next.next;
  }
  return first.next;
}
console.log(JSON.stringify(map(node0)));



//  2 1
//  1 2 3 4 5 6 7
//  8 9 10
var findMedianSortedArrays = function(nums1, nums2) {
  let mid = parseInt((nums1.length + nums2.length) / 2);
  let sort = [];
  let m = 0,n = 0;
  while( m < nums1.length && n < nums2.length && sort.length <= mid){
    if(nums1[m] <= nums2[n]){
      sort.push(nums1[m++])
    }else{
      sort.push(nums2[n++])
    }
  }
  if(sort.length <= mid){
    let last = m < nums1.length ? nums1 : nums2;
    for (let index = m < nums1.length ? m : n; index < last.length && sort.length <= mid; index++) {
     sort.push(last[index]);
    }
  }
  return ((nums1.length + nums2.length) % 2) === 0 ? (sort[mid] + sort[mid - 1]) / 2 : sort[mid]
};

console.log(findMedianSortedArrays([1,1,1],[1,2]));