---
title: 탑코더 알고리즘 정복 - 3. 암호
date: '2018-11-05'
category: 'algorithm'
---

## 문제
TopCoder Security Agency(TSA, 오늘 설립되었어요!)는 새로운 암호화 시스템을 개발했습니다.  
이 시스템은 암호화하려고 숫자 리스트를 입력받습니다.

여러분은 TSA의 비밀 정보 수사원입니다. 암호화 과정에서 중요한 부분을 구현하는 것이 여러분의 일입니다.  
여러분은 입력 리스트에서 1개의 값을 선택하고 값을 1 증가시킵니다. 이때 리스트 내부의 모든 숫자 곱이  
가장 커져야 합니다.

int[] numbers 형태로 숫자 배열이 주어질 때 곱의 최댓값을 리턴하세요. 리턴값이 $2^62$를 넘는 문제는 나오지 않을 것을 보장합니다.

## 정의
```py
class Cryptography:
	def encrypt(self, numbers):
```

## 입력
numbers : 2~50개의 요소가 있는 배열이며 각 요소의 값은 1~1000입니다.


## 출력
정수를 담고있는 변수

## IO Example
```py
# Case# 0
numbers=[1, 2, 3]
returns=12

# Case# 1
numbers=[1, 3, 2, 1, 1, 3]
returns=36

# Case# 2
numbers=[1000, 999, 998, 997, 996, 995]
returns=986074810223904000

# Case# 3
numbers=[1, 1, 1, 1]
returns=2
```

## 구현

### 1차 코드
1. +1 하는 숫자를 정한다.
2. 그리고 모든 곱을 계산하고 최댓값을 선택한다.

```py
class Cryptography:
    def encrypt(self, numbers):
        ans = 0
        for i in range(len(numbers)):
            temp = 1
            for j in range(len(numbers)):
                if i == j:
                    temp *= numbers[i] + 1
                else:
                    temp *= numbers[j]

            ans = max(ans, temp)

        return ans
```

### 2차 코드
1. +1 하는 숫자는 최소값.
2. 그리고 모든 곱을 계산한다.
```py
class Cryptography:
    def encrypt(self, numbers):
        ans = 1

        numbers = sorted(numbers)
        numbers[0] += 1

        for number in numbers:
            ans *= number

        return ans
```

## 마무리
- **수학적 지식이 있으면 좋다**  
수학적 지식이 있다면 2차 코드처럼 간결하게 바로 풀었겠지만 그렇지 않더라도 전체 탐색으로 해결할 수 있었다.
