import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsPage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Universal University</Text>
      <Text style={styles.description}>
        Welcome to Universal, your gateway to quality online education.
        Our university is committed to providing accessible and flexible learning opportunities
        to students worldwide. With a diverse range of programs and courses, we cater to the
        educational needs of learners from various backgrounds and interests.
      </Text>
      <Text style={styles.description}>
        At Universal, we strive for excellence in education, offering
        innovative teaching methods, experienced instructors, and cutting-edge
        technology to ensure our students receive a top-notch learning experience.
        Whether you're pursuing a degree, enhancing your skills, or exploring new
        interests, we have something for everyone.
      </Text>
      <Text style={styles.description}>
        Our dedicated faculty and staff are here to support you every step of the way,
        providing personalized guidance and fostering a collaborative learning environment.
        Join our vibrant community of learners and embark on a journey of knowledge
        and discovery with Universal.
      </Text>
      <Text style={styles.signature}>- The Universal Team</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
   
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000000',
  },
  description: {
    fontSize: 16,
    marginBottom: 15,
    color: '#000000',
  },
  signature: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 20,
    color: '#000000',
  },
});

export default AboutUsPage;
