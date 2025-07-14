import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const px = (value) => (width / 390) * value;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  titleText: {
    position: 'absolute',
    top: px(88),
    left: px(34),
    fontSize: px(23),
    fontWeight: '700',
    lineHeight: px(24),
    color: '#1A1A1A',
  },
  tagListContainer: {
    position: 'absolute',
    top: px(135),
    left: px(34),
    flexDirection: 'row',
    gap: px(8),
    paddingRight: px(20),
  },
  tagButton: {
    width: px(72),
    height: px(35),
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTag: {
    backgroundColor: '#7A73FF',
  },
  unselectedTag: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#ABABAB',
  },
  tagText: {
    fontSize: px(17),
    fontWeight: '500',
    lineHeight: px(19),
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#ABABAB',
  },
  routinePreviewContainer: {
    position: 'absolute',
    top: px(210),
    left: px(39),
    right: px(39),
  },
});

export default styles;
