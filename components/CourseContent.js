import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, Text, useColorScheme } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import Buttons from "../screens/drawerScreens/Button";
import { getRecentCourses } from "../data/coursefetch";
import Modal from "react-native-modal";
import RadioGroup from 'react-native-radio-buttons-group';
import Input from '../screens/drawerScreens/Input';
import DropDownPicker from 'react-native-dropdown-picker';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Phone Payment', value: 'phone' },
    { label: 'Coupon Payment', value: 'coupon' },
  ]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const recentCourses = await getRecentCourses();
        if (Array.isArray(recentCourses) && recentCourses.length > 0) {
          setCourses(recentCourses);
        } else {
          console.error("Invalid data format returned from API");
        }
      } catch (error) {
        console.error("Error fetching recent posts:", error);
      }
    };

    fetchCourses();
  }, []);

  const [errors, setErrors] = useState({});
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handlePaymentMethodChange = (value) => {
    setSelectedPaymentMethod(value);
    setModalVisible(true); // Assuming you want to show the modal when a payment method is selected
  };


  const PhonePaymentHandler = (event) => {
    event.preventDefault();
    //const amount = course.price; // Use course price
    const student_id = localStorage.getItem('id');
    const course_id = course._id;
    const accessTokenData = localStorage.getItem('accessToken');
    const token = accessTokenData ? JSON.parse(accessTokenData).token : null
    console.log('Coupon Code:', couponCode);
    console.log('student id:', student_id);
    console.log('course id', course_id);
    const requestData = {
        "coupon_code": couponCode,
        "student_id": student_id,
        "course_id": course_id,
    };
    Axios.post("http://universalonlineuniversity.org/api/register/coupon-course", requestData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status === 201) {
          toast({ title: "Payment Request Successful." });
          setPhone(""); // Reset the phone state to empty
            navigate('/courses')
        } else if (res.status === 400) {
          setPhone(""); // Reset the phone state to empty
          toast({ title: "Payment Request Failed. Please try again." });
        
        }
      })
      .catch((error) => {
        toast({ title: "Payment Request Failed. Please try again." });
        console.log(error);
      });
  }


  const CouponPaymentHandler = (event) => {
    event.preventDefault();
    //const amount = course.price; // Use course price
    const client_id = localStorage.getItem('id');
    const course_id = course._id;
    const courseprice = course.price 
    const accessTokenData = localStorage.getItem('accessToken');
    const token = accessTokenData ? JSON.parse(accessTokenData).token : null
    console.log('phone:', phone);
    console.log('amount', courseprice);
    console.log('student id:', client_id);
    console.log('course id', course_id);

     const requestData = {
        "phone": phone,
        "amount": courseprice,
        "student_id": client_id,
        "course_id": course_id,
    };
    Axios.post("http://universalonlineuniversity.org/Account/api/stk-push/", requestData,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((res) => {
        if (res.status === 201) {
          toast({ title: "Payment Request Successful." });
          setPhone(""); // Reset the phone state to empty
            navigate('/courses')
        } else if (res.status === 400) {
          setPhone(""); // Reset the phone state to empty
          toast({ title: "Payment Request Failed. Please try again." });
        
        }
      })
      .catch((error) => {
        toast({ title: "Payment Request Failed. Please try again." });
        console.log(error);
      });
  }


  return (
  <View >
      {courses.map((course, index) => (
        <CourseContent key={index} course={course} toggleModal={toggleModal} />
      ))}
      <Modal isVisible={isModalVisible}  >
        <View style={styles.modalContent}>
          <Text>Complete your purchase with MPESA!</Text>
          <View style={{ marginVertical: 20, alignItems: "center" }}>
         <DropDownPicker
        open={open}
        value={selectedPaymentMethod}
        items={items}
        setOpen={setOpen}
        setValue={setSelectedPaymentMethod}
        setItems={setItems}
        onChangeValue={handlePaymentMethodChange}
      />
          </View>
          {selectedPaymentMethod === 'phone' && (
            <View style={{ marginVertical: 20, width: 300 }}>
              <Input
                onChangeText={(text) => handleOnchange(text, 'phone')}
                onFocus={() => handleError(null, 'phone')}
                iconName="email-outline"
                label="Phone"
                placeholder="Enter your phone number"
                error={errors.phone}
              />
              <Buttons title="Make Purchase" onPress={toggleModal} />
            </View>
          )}

          {selectedPaymentMethod === 'coupon' && (
            <View style={{ marginVertical: 20, width: 300 }}>
              <Input
                onChangeText={(text) => handleOnchange(text, 'coupon')}
                onFocus={() => handleError(null, 'coupon')}
                iconName="email-outline"
                label="Coupon"
                placeholder="Enter your coupon"
                error={errors.coupon}
              />
              <Buttons title="Coupon Purchase" onPress={toggleModal} />
            </View>
          )}

          <Text>or</Text>

          <Buttons title="Cancel Order" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
   );
};

const CourseContent = ({ course, toggleModal }) => {
  const theme = useColorScheme();

  const GrayText = ({ children, numberOfLines, style }) => {
    return (
      <Text style={[style, styles.gray]} numberOfLines={numberOfLines}>
        {children}
      </Text>
    );
  };

  return (
    <View style={styles.singleItem}>
      <View style={styles.row}>
        <View style={styles.courseContentContainer}>
          <View style={styles.rowTop}>
            <Text
              numberOfLines={1}
              style={[
                styles.header,
                { color: theme === "dark" ? "#FFF" : "#000" },
              ]}
            >
               {course.title}
            </Text>
        
          </View>
              <GrayText style={styles.author} numberOfLines={1}>
              by {course.Instructor}.
            </GrayText>
          

          <Text
            style={[
              styles.description,
              { color: theme === "dark" ? "#FFF" : "#000" },
            ]}
          >
            {course.content}
          </Text>
          <View>
            <GrayText style={styles.author} numberOfLines={1}>
              Course Starting Day: {course.startingday}
            </GrayText>
            <GrayText style={styles.author} numberOfLines={1}>
              Course Ending Day: {course.endingday}
            </GrayText>
            <GrayText>Streaming Time: {course.streamingtime}</GrayText>
            <GrayText>Duration: {course.courseduration}</GrayText>
            <GrayText>Price: {course.price}</GrayText>
          </View>
          <View>
            {course.image && (
              <Image style={styles.courseImage} source={{ uri: course.image }} />
            )}
          </View>
          <Buttons title="Purchase" onPress={toggleModal} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalContent: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20, // Add some padding for the modal content if needed
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    flexShrink: 1,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingRight: 4,
  },
  description: {
    fontSize: 14,
  },
  singleItem: {
    paddingVertical: 16,
  },
  rowTop: {
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  courseContentContainer: {
    flex: 1,
  },
  courseImage: {
    height: 300,
    width: 300,
    borderRadius: 22,
    marginTop: 8,
  },
author: {
    flexShrink: 1,
  },
  actionBar: {
    marginTop: 8,
    justifyContent: "space-between",
    marginRight: 16,
  },
  actionButton: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  gray: {
    color: "#777",
    fontSize: 13,
    paddingRight: 2,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    marginRight: 16,
    flexShrink: 0,
    marginTop: 4,
  },
  mycourses: {
    height: 300,
    width: 300,
    borderRadius: 22,
    marginRight: 6,
    flexShrink: 0,
    marginTop: 2,
  },

  image: {
    height: 300,
    width: 300,
    borderRadius: 22,
    marginRight: 6,
    flexShrink: 0,
    marginTop: 2,
  },
  header: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 4,
    paddingRight: 4,
    color: "#000",
  },
  description: {
    fontSize: 14,
    color: "#000",
  },
  singleItem: {
    paddingHorizontal: 16,
    minHeight: 44,
    flex: 1,
    padding: 16,
  },
  rowTop: {
    flexDirection: "row",
  },
  rowActions: {
    flexGrow: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
  },
  elemAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  actionText: {
    fontSize: 12,
    color: "#444",
  },
  tweetContentContainer: {
    flexShrink: 1,
    flexGrow: 1,
  },
});

export default Course;