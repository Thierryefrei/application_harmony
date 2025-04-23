import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ArrowLeft, Music } from 'lucide-react-native';
import { router } from 'expo-router';
import Button from '@/components/core/Button';

// Mock quiz data - in a real app, this would come from an API
const mockQuiz = {
  question: "Which artist released 'Renaissance' in 2022?",
  options: [
    "Taylor Swift",
    "Beyoncé",
    "Adele",
    "Lady Gaga"
  ],
  correctAnswer: 1,
  image: "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg"
};

export default function QuizScreen() {
  const { colors, isDark } = useTheme();
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    setShowResult(true);
  };

  const nextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    // In a real app, load the next question
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color={colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: colors.text }]}>
          {t('quiz.title')}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <Image source={{ uri: mockQuiz.image }} style={styles.questionImage} />
        
        <View style={[styles.questionCard, { backgroundColor: colors.card }]}>
          <Music size={24} color={colors.primary} style={styles.questionIcon} />
          <Text style={[styles.question, { color: colors.text }]}>
            {mockQuiz.question}
          </Text>
          
          <View style={styles.options}>
            {mockQuiz.options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.option,
                  { backgroundColor: colors.background },
                  selectedAnswer === index && { backgroundColor: colors.primary + '20' },
                  showResult && index === mockQuiz.correctAnswer && { backgroundColor: colors.success + '20' },
                  showResult && selectedAnswer === index && index !== mockQuiz.correctAnswer && { backgroundColor: colors.error + '20' },
                ]}
                onPress={() => !showResult && handleAnswer(index)}
                disabled={showResult}
              >
                <Text 
                  style={[
                    styles.optionText,
                    { color: colors.text },
                    selectedAnswer === index && { color: colors.primary },
                    showResult && index === mockQuiz.correctAnswer && { color: colors.success },
                    showResult && selectedAnswer === index && index !== mockQuiz.correctAnswer && { color: colors.error },
                  ]}
                >
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        {!showResult ? (
          <Button
            title={t('quiz.checkAnswer')}
            onPress={checkAnswer}
            disabled={selectedAnswer === null}
          />
        ) : (
          <Button
            title={t('quiz.nextQuestion')}
            onPress={nextQuestion}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  questionCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  questionIcon: {
    marginBottom: 16,
  },
  question: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 24,
  },
  options: {
    width: '100%',
  },
  option: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
  },
});