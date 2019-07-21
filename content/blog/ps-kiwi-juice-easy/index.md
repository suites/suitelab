---
title: 탑코더 알고리즘 정복 - 1. 키위 주스
date: '2018-10-30'
category: "algorithm"
---

## 문제
타로는 맛있는 키위 주스를 준비했습니다.  
타로는 0부터 N-1이라 이름을 붙인 N개의 병에 키위 주스를 넣었습니다.  
이때 i번째의 병의 용량은 capacities[i] 리터이며 타로가 i번째 병에 넣은 키위 주스의 양을 bottles[i] 리터라고 합니다.

타로는 병에 키위 주스를 재분배하려고 하며, 0부터 M-1까지 M회 조작합니다.  
i번쨰의 조작은 타로가 병 fromId[i]부터 병 toId[i]에 키위 주스를 넣는 것을 의미합니다.  
병 fromId[i]가 비어 있거나 병 toId[i]가 꽉 차 있는 순간, 타로는 더 이상 키위 주스를 넣지 않습니다.

N개의 요소를 가진 정수 배열 int[]를 리턴해주세요.  
배열의 i번째 요소는 모든 주스를 쏟는 작업이 완료되고 i번째 병에 남아 있는 키위 주스의 양입니다.

## 정의
```py
class KiwiJuiceEasy:
	def thePouring(self, capacities, bottles, fromId, told):
```

## 입력
capacities : 2~50개의 요소가 있는 배열, 각 요소는 1 <= N <= 1000000 사이의 값을 갖는다.
bottles : capacities와 같은 수의 요소가 있는 배열. bottles[i]는 capacities[i]에 들어있는 주스의 양을 의미
fromId : 1~50개의 요소가 있는 배열
toId : fromId와 같은 수의 요소가 있는 배열

## 출력
병들에 남아있는 주스의 양을 담고 있는 배열

## IO Example
```py
# Case# 0
capacities = [20, 20]
bottles = [5, 8]
from_id = [0]
to_id = [1]

result : [0, 13]

# Case# 1
capacities = [10, 10]
bottles = [5, 8]
from_id = [0]
to_id = [1]

result : [3, 10]

# Case# 2
capacities = [30, 20, 10]
bottles = [10, 5, 5]
from_id = [0, 1, 2]
to_id = [1, 2, 0]

result : [10, 10, 0]

# Case# 3
capacities = [14, 35, 86, 58, 25, 62]
bottles = [6, 34, 27, 38, 9, 60]
from_id = [1, 2, 4, 5, 3, 3, 1, 0]
to_id = [0, 1, 2, 4, 2, 5, 3, 1]

result : [0, 14, 65, 35, 25, 35]

# Case# 4
capacities = [700000, 800000, 900000, 1000000]
bottles = [478478, 478478, 478478, 478478]
from_id = [2, 3, 2, 0, 1]
to_id = [0, 1, 1, 3, 2]

result : [0, 156956, 900000, 856956]
```

## 구현

### 1차 코드
1차로 작성한 코드는 모든 경우의 수를 나열하려고 노력했었던 것 같다.  
모든 5개의 테스트케이스는 통과했지만,
조건문을 4개나 사용하고 작업 후에 ret배열에 새로 담는 불필요한 행동까지 하면서 메모리와 소스코드의 난독화를 유발한 것 같다.

```py
class KiwiJuiceEasy:
    def the_pouring(self, capacities, bottles, from_id, to_id):
        ret = []

        for i in range(len(from_id)):
            from_i = from_id[i]
            to_i = to_id[i]

            # 옮길 병이 비어있으면 pass
            if bottles[from_i] == 0:
                continue

            # 담길 병이 꽉차있으면 pass
            if bottles[to_i] == capacities[to_i]:
                continue

            # 옮길 병의 용량보다 from + to의 내용물이 적거나 같으면
            # bottles[to_i]에 주스를 옮김.
            if bottles[from_i] + bottles[to_i] <= capacities[to_i]:
                bottles[to_i] += bottles[from_i]
                bottles[from_i] = 0

            # 옮길 병의 용량보다 from + to의 내용물이 많으면
            # bottles[to_i]에 주스를 옮기고 나머지를 from에 남김.
            elif bottles[from_i] + bottles[to_i] > capacities[to_i]:
                tmp = bottles[to_i] + bottles[from_i] - capacities[to_i]
                bottles[to_i] = capacities[to_i]
                bottles[from_i] = tmp

        # 모든 bottles를 ret에 담음
        for bottle in bottles:
            ret.append(bottle)

        return ret
```

### 2차 코드
2차로 작성한 코드는 조건문이 필요이상으로 많으면 코드 양이 늘어나고 버그를 찾기 힘들게 된다.  
이 문제의 경우 if문을 min함수로 대체할 수 있었다.  
옮길 주스의 양과 기존 주스 병의 남은 용량을 비교하여 작은 것이 이동량이 되기 때문이다.  
min함수로 대체하면서 조건문이 꽤나 사라져서 코드의 가독성이 훨씬 좋아졌다.  
그리고 ret 배열을 제거하여 바로 bottles 배열을 return하게끔 하였다.

```py
class KiwiJuiceEasy:
    def the_pouring(self, capacities, bottles, from_id, to_id):
        for i in range(len(from_id)):
            f = from_id[i]
            t = to_id[i]

            # 옮길 주스의 양과 기존 주스 병의 남은 용량을 비교해
            # 작은 것이 이동량이 된다.
            vol = min(bottles[f], capacities[t] - bottles[t])

            # 옮길 주스 병에 이동량을 뺀다.
            bottles[f] -= vol
            # 기존 주스 병의 남은 용량에 이동량을 더한다.
            bottles[t] += vol

        return bottles
```

### 3차 코드
3차로 작성한 코드는 반복문 내부의 로직이 무려 **3줄**이다!!  
시작부에 f와 t의 변수 선언을 제거함으로써 숏코딩이 되었지만 가독성면에선 조금 불편해졌다고 느껴진다.
하지만 프로세스는 꽤나 심플하다.  
이동량을 무시하고 옮길 주스와 기존 주스 양의 총합이 일정하고,  
옮길 주스는 주스 총량과 기존 주스 병의 용량 중에 작은 값이 된다는 것을 이용하기로 했다.


- 기존 주스(bottles[to_id[i]]) : min(옮길 주스 + 기존 주스, 기존 주스 병의 용량)
- 옮길 주스(bottles[from_id[i]]) : (옮길 주스 + 기존 주스) - 기존 주스

```py
class KiwiJuiceEasy:
    def the_pouring(self, capacities, bottles, from_id, to_id):
        for i in range(len(from_id)):
            sum = bottles[from_id[i]] + bottles[to_id[i]]
            bottles[to_id[i]] = min(sum, capacities[to_id[i]])
            bottles[from_id[i]] = sum - bottles[to_id[i]]

        return bottles
```

## 마무리
- **문제를 이해했다면 손으로 계산해보기.**
  머리로만 문제를 해결하려고 하면 표면적인 부분까지 밖에 생각하지 못함.  
  여러가지 경우의 수를 생각하며 문제를 이해해보기.
  어떻게 코드를 작성해야겠다 생각이 들어도 누락된 부분이 없는지 확인하기.  

- **코딩이 오래 걸린다면 다시 한 번 손으로 생각해보기.**
  많은 것을 생각하고 코드를 작성해도 예상하지 못한 곳에서 문제가 발생 할 수 있음.  
  이럴땐 코드 작성을 중단하고 문제를 다시 생각해보기.  

- **조건문을 되도록 조금 사용하기.**
  모든 문제가 Example에서 모든 Testcase를 주는 것은 아니기 때문에 가능한 조건문을 적게 사용해 버그를 줄여야 한다.
