import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './BottomTabBar.styles'; // 스타일 분리

// 하단 탭에 표시될 항목 목록 정의
const tabs = [
  { label: '나의 루틴',
    key: 'routine',
    activeIcon: require('../../assets/images/bottom_main2.png'),
    inactiveIcon: require('../../assets/images/bottom_main.png'),
  },
  { label: '피드백 카드',
    key: 'feedback',
    activeIcon: require('../../assets/images/bottom_card2.png'),
    inactiveIcon: require('../../assets/images/bottom_card.png'),
  },
  { label: '추천 루틴',
    key: 'sample',
    activeIcon: require('../../assets/images/bottom_routine2.png'),
    inactiveIcon: require('../../assets/images/bottom_routine.png'),
  },
];

// 하단 탭바 컴포넌트
export default function BottomTabBar({ currentTab, onTabPress }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = currentTab === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabItem}
            onPress={() => onTabPress(tab.key)} // 탭 클릭 시 상위 상태 변경 요청
          >
            <Image
              source={isActive ? tab.activeIcon : tab.inactiveIcon}
              style={styles.icon}
            />
            <Text
              style={[
                styles.label,
                { color: isActive ? '#7A73FF' : '#ABABAB' }, // 텍스트 색상도 선택 여부에 따라 변경
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
