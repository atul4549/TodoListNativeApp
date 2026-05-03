// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Linking,
//   Alert,
//   Animated,
//   Modal,
//   Pressable,
// } from 'react-native';
// import { Colors } from '../constants/colors';

// const DeveloperCard = () => {
//   const [isVisible, setIsVisible] = useState(false);
//   const [scaleAnim] = useState(new Animated.Value(0));

//   const openModal = () => {
//     setIsVisible(true);
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       friction: 8,
//       tension: 40,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(scaleAnim, {
//       toValue: 0,
//       duration: 200,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsVisible(false);
//     });
//   };

//   const handleEmailPress = () => {
//     const email = 'atul4545@zohomail.in';
//     const subject = 'Hello from Todo App';
//     const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    
//     Linking.canOpenURL(mailtoUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(mailtoUrl);
//         } else {
//           Alert.alert(
//             'Email Client Not Found',
//             `You can reach me at: ${email}`,
//             [{ text: 'OK' }]
//           );
//         }
//       })
//       .catch((err) => {
//         Alert.alert('Error', 'Could not open email client');
//         console.error('Email error:', err);
//       });
//   };

//   const handleInstagramPress = () => {
//     const instagramAppUrl = 'instagram://user?username=at.ul8809_him';
//     const instagramWebUrl = 'https://www.instagram.com/at.ul8809_him/';

//     Linking.canOpenURL(instagramAppUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(instagramAppUrl);
//         } else {
//           Linking.openURL(instagramWebUrl);
//         }
//       })
//       .catch(() => {
//         Linking.openURL(instagramWebUrl);
//       });
//   };

//   const handleLinkedInPress = () => {
//     const linkedInUrl = 'https://www.linkedin.com/in/atul-himanshu-4a9255306/';
//     const linkedInAppUrl = 'linkedin://profile/atul-himanshu-4a9255306';

//     Linking.canOpenURL(linkedInAppUrl)
//       .then((supported) => {
//         if (supported) {
//           Linking.openURL(linkedInAppUrl);
//         } else {
//           Linking.openURL(linkedInUrl);
//         }
//       })
//       .catch(() => {
//         Linking.openURL(linkedInUrl);
//       });
//   };

//   const openLink = async (url) => {
//     try {
//       const supported = await Linking.canOpenURL(url);
//       if (supported) {
//         await Linking.openURL(url);
//       } else {
//         Alert.alert('Error', 'Cannot open this link');
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Something went wrong');
//       console.error('Link error:', error);
//     }
//   };

//   return (
//     <>
//       {/* Floating Action Button */}
//       <TouchableOpacity
//         onPress={openModal}
//         style={{
//           position: 'absolute',
//           bottom: 100,
//           right: 20,
//           width: 56,
//           height: 56,
//           borderRadius: 28,
//           backgroundColor: Colors.primary,
//           justifyContent: 'center',
//           alignItems: 'center',
//           shadowColor: Colors.primary,
//           shadowOffset: { width: 0, height: 4 },
//           shadowOpacity: 0.4,
//           shadowRadius: 8,
//           elevation: 8,
//           zIndex: 1000,
//         }}
//         activeOpacity={0.8}
//       >
//         <Text style={{ fontSize: 24 }}>👨‍💻</Text>
//       </TouchableOpacity>

//       {/* Modal */}
//       <Modal
//         visible={isVisible}
//         transparent={true}
//         animationType="fade"
//         onRequestClose={closeModal}
//       >
//         <Pressable
//           onPress={closeModal}
//           style={{
//             flex: 1,
//             backgroundColor: 'rgba(0, 0, 0, 0.6)',
//             justifyContent: 'center',
//             alignItems: 'center',
//             padding: 20,
//           }}
//         >
//           <Animated.View
//             style={{
//               transform: [{ scale: scaleAnim }],
//               width: '100%',
//               maxWidth: 340,
//             }}
//           >
//             <Pressable
//               onPress={(e) => e.stopPropagation()}
//               style={{
//                 backgroundColor: Colors.surface,
//                 borderRadius: 24,
//                 padding: 24,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 10 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 20,
//                 elevation: 15,
//               }}
//             >
//               {/* Header */}
//               <View
//                 style={{
//                   alignItems: 'center',
//                   marginBottom: 24,
//                 }}
//               >
//                 {/* Avatar */}
//                 <View
//                   style={{
//                     width: 80,
//                     height: 80,
//                     borderRadius: 40,
//                     backgroundColor: Colors.primary,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginBottom: 16,
//                     borderWidth: 3,
//                     borderColor: Colors.primaryLight,
//                     shadowColor: Colors.primary,
//                     shadowOffset: { width: 0, height: 4 },
//                     shadowOpacity: 0.3,
//                     shadowRadius: 8,
//                     elevation: 5,
//                   }}
//                 >
//                   <Text style={{ fontSize: 36 }}>👨‍💻</Text>
//                 </View>

//                 {/* Name */}
//                 <Text
//                   style={{
//                     fontSize: 24,
//                     fontWeight: '800',
//                     color: Colors.textPrimary,
//                     marginBottom: 4,
//                   }}
//                 >
//                   Atul Himanshu
//                 </Text>

//                 {/* Role */}
//                 <View
//                   style={{
//                     backgroundColor: Colors.background,
//                     paddingHorizontal: 16,
//                     paddingVertical: 6,
//                     borderRadius: 20,
//                   }}
//                 >
//                   <Text
//                     style={{
//                       fontSize: 13,
//                       color: Colors.primary,
//                       fontWeight: '600',
//                     }}
//                   >
//                     React Native Developer
//                   </Text>
//                 </View>
//               </View>

//               {/* Contact Buttons */}
//               <View style={{ gap: 12 }}>
//                 {/* Email Button */}
//                 <TouchableOpacity
//                   onPress={handleEmailPress}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     backgroundColor: '#FEE2E2',
//                     padding: 16,
//                     borderRadius: 16,
//                     borderWidth: 1,
//                     borderColor: '#FECACA',
//                   }}
//                   activeOpacity={0.7}
//                 >
//                   <View
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: 14,
//                       backgroundColor: Colors.danger,
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       marginRight: 14,
//                       shadowColor: Colors.danger,
//                       shadowOffset: { width: 0, height: 2 },
//                       shadowOpacity: 0.3,
//                       shadowRadius: 4,
//                       elevation: 3,
//                     }}
//                   >
//                     <Text style={{ fontSize: 20 }}>📧</Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: Colors.danger,
//                         fontWeight: '600',
//                         marginBottom: 2,
//                       }}
//                     >
//                       EMAIL
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Colors.textPrimary,
//                         fontWeight: '500',
//                       }}
//                       numberOfLines={1}
//                     >
//                       atul4545@zohomail.in
//                     </Text>
//                   </View>
//                   <Text style={{ color: Colors.danger, fontSize: 18 }}>→</Text>
//                 </TouchableOpacity>

//                 {/* Instagram Button */}
//                 <TouchableOpacity
//                   onPress={handleInstagramPress}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     backgroundColor: '#FDF2F8',
//                     padding: 16,
//                     borderRadius: 16,
//                     borderWidth: 1,
//                     borderColor: '#FBCFE8',
//                   }}
//                   activeOpacity={0.7}
//                 >
//                   <View
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: 14,
//                       backgroundColor: '#E1306C',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       marginRight: 14,
//                       shadowColor: '#E1306C',
//                       shadowOffset: { width: 0, height: 2 },
//                       shadowOpacity: 0.3,
//                       shadowRadius: 4,
//                       elevation: 3,
//                     }}
//                   >
//                     <Text style={{ fontSize: 20 }}>📸</Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: '#E1306C',
//                         fontWeight: '600',
//                         marginBottom: 2,
//                       }}
//                     >
//                       INSTAGRAM
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Colors.textPrimary,
//                         fontWeight: '500',
//                       }}
//                     >
//                       @at.ul8809_him
//                     </Text>
//                   </View>
//                   <Text style={{ color: '#E1306C', fontSize: 18 }}>→</Text>
//                 </TouchableOpacity>

//                 {/* LinkedIn Button */}
//                 <TouchableOpacity
//                   onPress={handleLinkedInPress}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     backgroundColor: '#E0F2FE',
//                     padding: 16,
//                     borderRadius: 16,
//                     borderWidth: 1,
//                     borderColor: '#BAE6FD',
//                   }}
//                   activeOpacity={0.7}
//                 >
//                   <View
//                     style={{
//                       width: 44,
//                       height: 44,
//                       borderRadius: 14,
//                       backgroundColor: '#0077B5',
//                       justifyContent: 'center',
//                       alignItems: 'center',
//                       marginRight: 14,
//                       shadowColor: '#0077B5',
//                       shadowOffset: { width: 0, height: 2 },
//                       shadowOpacity: 0.3,
//                       shadowRadius: 4,
//                       elevation: 3,
//                     }}
//                   >
//                     <Text style={{ fontSize: 20 }}>💼</Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text
//                       style={{
//                         fontSize: 12,
//                         color: '#0077B5',
//                         fontWeight: '600',
//                         marginBottom: 2,
//                       }}
//                     >
//                       LINKEDIN
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         color: Colors.textPrimary,
//                         fontWeight: '500',
//                       }}
//                       numberOfLines={1}
//                     >
//                       Atul Himanshu
//                     </Text>
//                   </View>
//                   <Text style={{ color: '#0077B5', fontSize: 18 }}>→</Text>
//                 </TouchableOpacity>
//               </View>

//               {/* Close Button */}
//               <TouchableOpacity
//                 onPress={closeModal}
//                 style={{
//                   marginTop: 20,
//                   backgroundColor: Colors.background,
//                   paddingVertical: 12,
//                   borderRadius: 12,
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: Colors.textSecondary,
//                     fontSize: 16,
//                     fontWeight: '600',
//                   }}
//                 >
//                   Close
//                 </Text>
//               </TouchableOpacity>

//               {/* Footer */}
//               <Text
//                 style={{
//                   textAlign: 'center',
//                   marginTop: 16,
//                   fontSize: 11,
//                   color: Colors.textSecondary,
//                 }}
//               >
//                 Made with ❤️ using React Native
//               </Text>
//             </Pressable>
//           </Animated.View>
//         </Pressable>
//       </Modal>
//     </>
//   );
// };

// export default React.memo(DeveloperCard);


import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Stack, router } from 'expo-router';
// import { Colors } from '../src/constants/colors';

export const Colors = {
  primary: '#667EEA',
  primaryLight: '#C7D2FE',
  primaryDark: '#4F46E5',
  success: '#4CAF50',
  warning: '#F59E0B',
  warningLight: '#FBBF24',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#EBF5FF',
  white: '#FFFFFF',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceLight: '#F8F9FA',
  textPrimary: '#1F2937',
  textSecondary: '#9CA3AF',
  textLight: '#E0E7FF',
  border: '#D0D5DD',
  borderLight: '#E5E7EB',
  overlay: 'rgba(255, 255, 255, 0.1)',
  overlayStrong: 'rgba(255, 255, 255, 0.25)',
  overlayBorder: 'rgba(255, 255, 255, 0.4)',
  progressBg: 'rgba(255, 255, 255, 0.3)',
};

export default function DeveloperScreen() {
  const handleEmailPress = () => {
    const email = 'atul4545@zohomail.in';
    Linking.openURL(`mailto:${email}`).catch(() => {
      Alert.alert('Error', 'Could not open email client');
    });
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/at.ul8809_him/').catch(() => {
      Alert.alert('Error', 'Could not open Instagram');
    });
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/atul-himanshu-4a9255306/').catch(() => {
      Alert.alert('Error', 'Could not open LinkedIn');
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Developer Contact',
          headerStyle: { backgroundColor: Colors.primary },
          headerTintColor: Colors.white,
        }}
      />
      
      <ScrollView contentContainerStyle={{ padding: 20, alignItems: 'center' }}>
        {/* Avatar */}
        <View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: Colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
            marginBottom: 20,
            borderWidth: 4,
            borderColor: Colors.primaryLight,
          }}
        >
          <Text style={{ fontSize: 48 }}>👨‍💻</Text>
        </View>

        {/* Name */}
        <Text style={{ fontSize: 28, fontWeight: '800', color: Colors.textPrimary, marginBottom: 8 }}>
          Atul Himanshu
        </Text>

        {/* Role */}
        <View
          style={{
            backgroundColor: Colors.primaryLight,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
            marginBottom: 40,
          }}
        >
          <Text style={{ color: Colors.primary, fontWeight: '600' }}>
            {/* React Native Developer */}
            Software Developer
          </Text>
        </View>

        {/* Contact Cards */}
        <View style={{ width: '100%', gap: 16 }}>
          {/* Email Card */}
          <TouchableOpacity
            onPress={handleEmailPress}
            style={{
              backgroundColor: Colors.surface,
              padding: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: Colors.dangerLight,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              <Text style={{ fontSize: 24 }}>📧</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: Colors.danger, fontWeight: '600', marginBottom: 4 }}>
                Email
              </Text>
              <Text style={{ fontSize: 16, color: Colors.textPrimary, fontWeight: '500' }}>
                atul4545@zohomail.in
              </Text>
            </View>
          </TouchableOpacity>

          {/* Instagram Card */}
          <TouchableOpacity
            onPress={handleInstagramPress}
            style={{
              backgroundColor: Colors.surface,
              padding: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: '#FDF2F8',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              <Text style={{ fontSize: 24 }}>📸</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: '#E1306C', fontWeight: '600', marginBottom: 4 }}>
                Instagram
              </Text>
              <Text style={{ fontSize: 16, color: Colors.textPrimary, fontWeight: '500' }}>
                @at.ul8809_him
              </Text>
            </View>
          </TouchableOpacity>

          {/* LinkedIn Card */}
          <TouchableOpacity
            onPress={handleLinkedInPress}
            style={{
              backgroundColor: Colors.surface,
              padding: 20,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 12,
                backgroundColor: '#E0F2FE',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              <Text style={{ fontSize: 24 }}>💼</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 12, color: '#0077B5', fontWeight: '600', marginBottom: 4 }}>
                LinkedIn
              </Text>
              <Text style={{ fontSize: 16, color: Colors.textPrimary, fontWeight: '500' }}>
                @atul-himanshu-4a9255306
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}