---
title: 문장의 유사도 분석하기(레벤슈타인 거리, N-gram)
date: '2018-07-30'
category: "Deep Learning"
---

## 문장의 유사도 분석
단어 또는 문장의 유사도를 분석하는 방법 중에는 레벤슈타인 거리, N-gram 등이 있다.  
오늘은 이 방법들에 대해서 알아볼 것이다.

## 레벤슈타인 거리(Lvenshtein distance)
레벤슈타인 거리는 두 단어 또는 문장의 차이를 통해 거리를 수치로 나타내는 것이다.  
철자 오류 수정, 비슷한 어구 검색 등에 사용되고, 의학 분야에서는 DNA 배열의 유사성을 판단할 때도 사용하고 있다.

예를 들어  
'가나다라'를 '가마바라'로 수정할 때 몇 번의 수정이 필요한 지를 거리로 나타낼 수 있다.  

0 가나다라  
1 가'마'다라  
2 가마'바'라  

'가나다라'-> '가마바라'는 거리가 2임을 알 수 있다.

코드로 알아보자.

```py
def calc_distance(a, b):
    if a == b:
        return 0
    a_len = len(a)
    b_len = len(b)
    if a == "":
        return b_len
    if b == "":
        return a_len
    # 2차원 표 (a_len+1, b_len+2) 준비하기
    matrix = [[] for i in range(a_len+1)]
    for i in range(a_len+1):
        matrix[i] = [0 for j in range(b_len+1)]
    # 0일 때 초기값을 설정
    for i in range(a_len+1):
        matrix[i][0] = i
    for j in range(b_len+1):
        matrix[0][j] = j
    # 표 채우기
    for i in range(1, a_len+1):
        ac = a[i-1]
        for j in range(1, b_len+1):
            bc = b[j-1]
            cost = 0 if (ac == bc) else 1
            matrix[i][j] = min([
                matrix[i-1][j] + 1,     # 문자 삽입
                matrix[i][j-1] + 1,     # 문자 제거
                matrix[i-1][j-1] + cost # 문자 변경
            ])
    return matrix[a_len][b_len]

print(calc_distance('가나다라', '가마바라'))
# result : 2

samples = ['신촌역', '신쵼', '신천군', '신천역', '신발', '마곡역']
base = samples[0]
r = sorted(samples, key = lambda n: calc_distance(base, n))
for n in r:
    print(calc_distance(base, n), n)

/* result :
0 신촌역
1 신천역
2 신쵼
2 신천군
2 신발
2 마곡역
*/
```

## N-gram
N-gram은 이웃한 N개의 문자를 의미한다.  
서로 다른 2개의 문장을 N-gram으로 비교해보면 출현하는 단어의 종류와 빈도수, 유사도를 확인할 수 있다.  
N-gram은 논문 도용, 소스코드간 유사도 등에도 사용할 수 있다.  

예를들어  
- 오늘 강남에서 맛있는 스파게티를 먹었다.
- 강남에서 먹었던 오늘의 스파게티는 맛있었다.

위 문장들을 2글자씩 끊으면
```
['오늘', '늘 ', ' 강', '강남', '남에', '에서', '서 ', ' 맛', '맛있', '있는', '는 ', ' 스', '스파', '파게', '게티', '티를', '를 ', ' 먹', '먹었', '었다', '다.']

['강남', '남에', '에서', '서 ', ' 먹', '먹었', '었던', '던 ', ' 오', '오늘', '늘의', '의 ', ' 스', '스파', '파게', '게티', '티는', '는 ', ' 맛', '맛있', '있었', '었다', '다.']
```
이렇게 끊어지게 되는데  
이 구분된 문장들을 한 항목씩 비교해서 동일한 항목이 있을 때 count를 + 1 하여 총 count / 끊은 문장 배열의 항목 수
를 하여 유사도를 구하게 된다.  

코드로 알아보자.
```py
def ngram(s, num):
    res = []
    slen = len(s) - num + 1
    for i in range(slen):
        ss = s[i:i+num]
        res.append(ss)
    return res

def diff_ngram(sa, sb, num):
    a = ngram(sa, num)
    b = ngram(sb, num)
    r = []
    cnt = 0
    for i in a:
        for j in b:
            if i == j:
                cnt += 1
                r.append(i)
    return cnt / len(a), r


a = '오늘 강남에서 맛있는 스파게티를 먹었다.'
b = '강남에서 먹었던 오늘의 스파게티는 맛있었다.'

r2, word2 = diff_ngram(a, b, 2)
print('2-gram:', r2, word2)
# result : 2-gram: 0.7619047619047619 ['오늘', '강남', '남에', '에서', '서 ', ' 맛', '맛있', '는 ', ' 스', '스파', '파게', '게티', ' 먹', '먹었', '었다', '다.']

r3, word3 = diff_ngram(a, b, 3)
print('3-gram:', r3, word3)
# result : 3-gram: 0.45 ['강남에', '남에서', '에서 ', ' 맛있', ' 스파', '스파게', '파게티', ' 먹었', '었다.']
```

2문장씩 끊었을때의 유사도는 0.76, 3문장씩 끊었을때의 유사도는 0.45로 2문장씩 끊었을 때의 유사도가 더 높았다.  
N개의 문장을 끊을지는 hyper parameter가 될 것 같다. 유사도를 구할 문장에따라 적절한 값을 입력하면 좋은 결과가 있을 것 같다.  

위에 대한 소스코드는  
[https://github.com/suitelab/actual-deeplearning/blob/master/ch6/lev-distance.py](https://github.com/suitelab/actual-deeplearning/blob/master/ch6/lev-distance.py)  
[https://github.com/suitelab/actual-deeplearning/blob/master/ch6/ngram-test.py](https://github.com/suitelab/actual-deeplearning/blob/master/ch6/ngram-test.py)  
에 올려두었다.
