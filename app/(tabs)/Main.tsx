import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  SafeAreaView,
  StatusBar,
  Animated,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './DeveloperCard';
import { router } from 'expo-router';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Load todos from AsyncStorage on app start
  useEffect(() => {
    loadTodos();
  }, []);

  // Fade in animation
  useEffect(() => {
    if (!isLoading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [isLoading]);

  // Save todos to AsyncStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      saveTodos();
    }
  }, [todos]);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('@todo_app_todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load todos');
      console.error('Failed to load todos', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem('@todo_app_todos', JSON.stringify(todos));
    } catch (error) {
      Alert.alert('Error', 'Failed to save todos');
      console.error('Failed to save todos', error);
    }
  };

  // Add a new todo
  const addTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Empty Todo', 'Please enter a task description', [
        { text: 'OK' },
      ]);
      return;
    }
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTodos([newTodo, ...todos]);
    setText('');
    Keyboard.dismiss();
  };

  // Delete a todo
  const deleteTodo = (id) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => {
            setTodos(todos.filter((todo) => todo.id !== id));
            if (editingId === id) {
              setEditingId(null);
              setText('');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Toggle todo completion
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed, completedAt: !todo.completed ? new Date().toISOString() : null }
          : todo
      )
    );
  };

  // Start editing a todo
  const startEditing = (id, currentText) => {
    setEditingId(id);
    setText(currentText);
  };

  // Update a todo
  const updateTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Empty Todo', 'Please enter a task description', [
        { text: 'OK' },
      ]);
      return;
    }
    
    setTodos(
      todos.map((todo) =>
        todo.id === editingId
          ? { ...todo, text: text.trim(), updatedAt: new Date().toISOString() }
          : todo
      )
    );
    setText('');
    setEditingId(null);
    Keyboard.dismiss();
  };

  // Clear all completed todos
  const clearCompleted = () => {
    const completedCount = todos.filter((todo) => todo.completed).length;
    if (completedCount === 0) {
      Alert.alert('No Completed Tasks', 'There are no completed tasks to clear.');
      return;
    }
    
    Alert.alert(
      'Clear Completed',
      `Are you sure you want to delete ${completedCount} completed task${completedCount > 1 ? 's' : ''}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: () => setTodos(todos.filter((todo) => !todo.completed)),
          style: 'destructive',
        },
      ]
    );
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Get counts
  const totalCount = todos.length;
  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;
  
  // Calculate progress percentage
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Render individual todo item
  const renderTodo = ({ item, index }) => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      }}
    >
      <TouchableOpacity
        onPress={() => toggleComplete(item.id)}
        activeOpacity={0.7}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: item.completed ? '#F8F9FA' : '#FFFFFF',
          padding: 16,
          marginHorizontal: 20,
          marginVertical: 4,
          borderRadius: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
          borderLeftWidth: 4,
          borderLeftColor: item.completed ? '#4CAF50' : '#667EEA',
        }}
      >
        {/* Custom Checkbox */}
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: 14,
            borderWidth: 2,
            borderColor: item.completed ? '#4CAF50' : '#D0D5DD',
            backgroundColor: item.completed ? '#4CAF50' : '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 14,
            shadowColor: item.completed ? '#4CAF50' : 'transparent',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: item.completed ? 3 : 0,
          }}
        >
          {item.completed && (
            <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' }}>
              ✓
            </Text>
          )}
        </View>

        {/* Todo Content */}
        <View style={{ flex: 1 }}>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: item.completed ? '#9CA3AF' : '#1F2937',
              textDecorationLine: item.completed ? 'line-through' : 'none',
              marginBottom: 4,
            }}
          >
            {item.text}
          </Text>
          {(item.createdAt || item.completedAt) && (
            <Text
              style={{
                fontSize: 11,
                color: item.completed ? '#4CAF50' : '#9CA3AF',
                fontWeight: '400',
              }}
            >
              {item.completed
                ? `✓ Completed ${formatDate(item.completedAt)}`
                : `Created ${formatDate(item.createdAt)}`}
            </Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {!item.completed && (
            <TouchableOpacity
              onPress={() => startEditing(item.id, item.text)}
              style={{
                backgroundColor: '#EBF5FF',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
                marginRight: 8,
              }}
            >
              <Text style={{ color: '#3B82F6', fontWeight: '600', fontSize: 13 }}>
                ✏️
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            onPress={() => deleteTodo(item.id)}
            style={{
              backgroundColor: '#FEE2E2',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: '#EF4444', fontWeight: '600', fontSize: 13 }}>
              🗑️
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#667EEA',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <StatusBar barStyle="light-content" backgroundColor="#667EEA" />
        <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: 'bold' }}>
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
      <StatusBar barStyle="light-content" backgroundColor="#667EEA" />
      
      {/* Main Container */}
      <View style={{ flex: 1, backgroundColor: '#F3F4F6' }}>
        
        {/* Header Section */}
        <View
          style={{
            backgroundColor: '#667EEA',
            paddingTop: 20,
            paddingBottom: 30,
            paddingHorizontal: 24,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            shadowColor: '#667EEA',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 8,
          }}
        >
          {/* App Title */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <View>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 34,
                  fontWeight: '800',
                  letterSpacing: -0.5,
                }}
              >
                My Tasks
              </Text>
              <Text style={{ color: '#C7D2FE', fontSize: 14, marginTop: 4 }}>
                {activeCount} task{activeCount !== 1 ? 's' : ''} remaining
              </Text>
            </View>
            
            {/* Clear Completed Button */}
            {/* {completedCount > 0 && (
              <TouchableOpacity
                onPress={clearCompleted}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  paddingHorizontal: 16,
                  paddingVertical: 10,
                  borderRadius: 12,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 13 }}>
                  Clear Done
                </Text>
              </TouchableOpacity>
            )} */}
            
            {/* // Inside the header View, next to the title: */}
            <TouchableOpacity
              onPress={() => router.push('/DeveloperCard')}
              style={{
                backgroundColor: Colors.overlay,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: Colors.white, fontWeight: '600', fontSize: 13 }}>
                contact 👨‍💻 Developer
              </Text>
            </TouchableOpacity>
          </View>

          {/* Progress Bar */}
          {totalCount > 0 && (
            <View style={{ marginBottom: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: '#C7D2FE', fontSize: 12, fontWeight: '500' }}>
                  Progress
                </Text>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '600' }}>
                  {completedCount}/{totalCount} completed
                </Text>
              </View>
              <View
                style={{
                  height: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: 3,
                  overflow: 'hidden',
                }}
              >
                <View
                  style={{
                    height: '100%',
                    width: `${progressPercentage}%`,
                    backgroundColor: '#4CAF50',
                    borderRadius: 3,
                  }}
                />
              </View>
            </View>
          )}

          {/* Stats Cards */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {[
              { label: 'All', value: totalCount, color: '#FFFFFF' },
              { label: 'Active', value: activeCount, color: '#FBBF24' },
              { label: 'Done', value: completedCount, color: '#4CAF50' },
            ].map((stat) => (
              <TouchableOpacity
                key={stat.label}
                onPress={() => setFilter(stat.label.toLowerCase())}
                style={{
                  backgroundColor:
                    filter === stat.label.toLowerCase()
                      ? 'rgba(255, 255, 255, 0.25)'
                      : 'rgba(255, 255, 255, 0.1)',
                  paddingVertical: 12,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  alignItems: 'center',
                  minWidth: 90,
                  borderWidth: 1,
                  borderColor:
                    filter === stat.label.toLowerCase()
                      ? 'rgba(255, 255, 255, 0.4)'
                      : 'transparent',
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  style={{
                    color: '#E0E7FF',
                    fontSize: 12,
                    fontWeight: '500',
                    marginTop: 2,
                  }}
                >
                  {stat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Todo List */}
        <FlatList
          data={filteredTodos}
          renderItem={renderTodo}
          keyExtractor={(item) => item.id}
          style={{ flex: 1, marginTop: 10 }}
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Animated.View
              style={{
                opacity: fadeAnim,
                alignItems: 'center',
                marginTop: 80,
                paddingHorizontal: 40,
              }}
            >
              <Text style={{ fontSize: 64, marginBottom: 20 }}>📝</Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
                  textAlign: 'center',
                }}
              >
                {filter === 'all'
                  ? 'No tasks yet'
                  : filter === 'active'
                  ? 'No active tasks'
                  : 'No completed tasks'}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#9CA3AF',
                  textAlign: 'center',
                  lineHeight: 20,
                }}
              >
                {filter === 'all'
                  ? 'Add your first task using the input below and start being productive!'
                  : filter === 'active'
                  ? 'You\'re all caught up! Add new tasks or check completed ones.'
                  : 'Complete some tasks to see them here.'}
              </Text>
            </Animated.View>
          }
        />

        {/* Input Section */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 20,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          {/* Editing Indicator */}
          {editingId && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 12,
                paddingHorizontal: 4,
              }}
            >
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: '#F59E0B',
                  marginRight: 8,
                }}
              />
              <Text style={{ color: '#F59E0B', fontSize: 13, fontWeight: '600', flex: 1 }}>
                Editing task...
              </Text>
            </View>
          )}

          {/* Input Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#F3F4F6',
                borderRadius: 16,
                paddingHorizontal: 16,
                borderWidth: 2,
                borderColor: editingId ? '#F59E0B' : '#E5E7EB',
              }}
            >
              <Text style={{ fontSize: 18, marginRight: 8 }}>
                {editingId ? '✏️' : '📝'}
              </Text>
              <TextInput
                style={{
                  flex: 1,
                  paddingVertical: 14,
                  fontSize: 16,
                  color: '#1F2937',
                }}
                placeholder={editingId ? 'Update your task...' : 'Add a new task...'}
                placeholderTextColor="#9CA3AF"
                value={text}
                onChangeText={setText}
                onSubmitEditing={editingId ? updateTodo : addTodo}
                returnKeyType="done"
                maxLength={100}
              />
              {text.length > 0 && (
                <TouchableOpacity
                  onPress={() => {
                    setText('');
                    setEditingId(null);
                  }}
                >
                  <Text style={{ color: '#9CA3AF', fontSize: 18 }}>✕</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Add/Update Button */}
            <TouchableOpacity
              onPress={editingId ? updateTodo : addTodo}
              style={{
                backgroundColor: editingId ? '#F59E0B' : '#667EEA',
                width: 48,
                height: 48,
                borderRadius: 16,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                shadowColor: editingId ? '#F59E0B' : '#667EEA',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 5,
              }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: 'bold' }}>
                {editingId ? '✓' : '+'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Character Count */}
          {text.length > 0 && (
            <Text
              style={{
                color: text.length > 80 ? '#EF4444' : '#9CA3AF',
                fontSize: 11,
                textAlign: 'right',
                marginTop: 6,
                marginRight: 60,
              }}
            >
              {text.length}/100
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   Alert,
//   SafeAreaView,
//   Animated,
//   Keyboard,
//   TouchableOpacity,
// } from 'react-native';
// import { useTodos } from '../src/hooks/useTodos';
// import TodoHeader from '../src/components/TodoHeader';
// import FilterButtons from '../src/components/FilterButtons';
// import TodoItem from '../src/components/TodoItem';
// import TodoInput from '../src/components/TodoInput';
// import EmptyState from '../src/components/EmptyState';
// import { Colors } from '../src/constants/colors';

// export default function TodoScreen() {
//   const {
//     todos,
//     isLoading,
//     addTodo,
//     deleteTodo,
//     toggleComplete,
//     updateTodo,
//     clearCompleted,
//     getFilteredTodos,
//     getCounts,
//     getProgress,
//   } = useTodos();

//   const [text, setText] = useState('');
//   const [editingId, setEditingId] = useState(null);
//   const [filter, setFilter] = useState('all');
//   const [fadeAnim] = useState(new Animated.Value(0));

//   // Fade in animation
//   useEffect(() => {
//     if (!isLoading) {
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isLoading]);

//   const counts = getCounts();
//   const progress = getProgress();
//   const filteredTodos = getFilteredTodos(filter);

//   // Handle add todo
//   const handleAddTodo = () => {
//     const success = addTodo(text);
//     if (success) {
//       setText('');
//       Keyboard.dismiss();
//     } else {
//       Alert.alert('Empty Todo', 'Please enter a task description', [{ text: 'OK' }]);
//     }
//   };

//   // Handle update todo
//   const handleUpdateTodo = () => {
//     const success = updateTodo(editingId, text);
//     if (success) {
//       setText('');
//       setEditingId(null);
//       Keyboard.dismiss();
//     } else {
//       Alert.alert('Empty Todo', 'Please enter a task description', [{ text: 'OK' }]);
//     }
//   };

//   // Handle delete with confirmation
//   const handleDeleteTodo = (id) => {
//     Alert.alert(
//       'Delete Task',
//       'Are you sure you want to delete this task?',
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Delete',
//           onPress: () => {
//             deleteTodo(id);
//             if (editingId === id) {
//               setEditingId(null);
//               setText('');
//             }
//           },
//           style: 'destructive',
//         },
//       ]
//     );
//   };

//   // Handle start editing
//   const handleStartEdit = (id, todoText) => {
//     setEditingId(id);
//     setText(todoText);
//   };

//   // Handle cancel editing
//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setText('');
//   };

//   // Handle clear completed
//   const handleClearCompleted = () => {
//     if (counts.completed === 0) {
//       Alert.alert('No Completed Tasks', 'There are no completed tasks to clear.');
//       return;
//     }

//     Alert.alert(
//       'Clear Completed',
//       `Are you sure you want to delete ${counts.completed} completed task${counts.completed > 1 ? 's' : ''}?`,
//       [
//         { text: 'Cancel', style: 'cancel' },
//         {
//           text: 'Clear',
//           onPress: clearCompleted,
//           style: 'destructive',
//         },
//       ]
//     );
//   };

//   if (isLoading) {
//     return (
//       <SafeAreaView
//         style={{
//           flex: 1,
//           backgroundColor: Colors.primary,
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Animated.Text 
//           style={{ 
//             color: Colors.white, 
//             fontSize: 24, 
//             fontWeight: 'bold',
//             opacity: fadeAnim 
//           }}
//         >
//           Loading your tasks...
//         </Animated.Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
//       <View style={{ flex: 1, backgroundColor: Colors.background }}>
//         {/* Header */}
//         <View
//           style={{
//             backgroundColor: Colors.primary,
//             paddingTop: 20,
//             paddingBottom: 30,
//             paddingHorizontal: 24,
//             borderBottomLeftRadius: 30,
//             borderBottomRightRadius: 30,
//             shadowColor: Colors.primary,
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.3,
//             shadowRadius: 8,
//             elevation: 8,
//           }}
//         >
//           {/* Title Row */}
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: 24,
//             }}
//           >
//             <View>
//               <Text style={{ color: Colors.white, fontSize: 34, fontWeight: '800', letterSpacing: -0.5 }}>
//                 My Tasks
//               </Text>
//               <Text style={{ color: Colors.primaryLight, fontSize: 14, marginTop: 4 }}>
//                 {counts.active} task{counts.active !== 1 ? 's' : ''} remaining
//               </Text>
//             </View>

//             {counts.completed > 0 && (
//               <TouchableOpacity
//                 onPress={handleClearCompleted}
//                 style={{
//                   backgroundColor: Colors.overlay,
//                   paddingHorizontal: 16,
//                   paddingVertical: 10,
//                   borderRadius: 12,
//                 }}
//               >
//                 <Text style={{ color: Colors.white, fontWeight: '600', fontSize: 13 }}>
//                   Clear Done
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>

//           {/* Progress Bar */}
//           {counts.total > 0 && (
//             <View style={{ marginBottom: 20 }}>
//               <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
//                 <Text style={{ color: Colors.primaryLight, fontSize: 12, fontWeight: '500' }}>
//                   Progress
//                 </Text>
//                 <Text style={{ color: Colors.white, fontSize: 12, fontWeight: '600' }}>
//                   {counts.completed}/{counts.total} completed
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   height: 6,
//                   backgroundColor: Colors.progressBg,
//                   borderRadius: 3,
//                   overflow: 'hidden',
//                 }}
//               >
//                 <View
//                   style={{
//                     height: '100%',
//                     width: `${progress}%`,
//                     backgroundColor: Colors.success,
//                     borderRadius: 3,
//                   }}
//                 />
//               </View>
//             </View>
//           )}

//           {/* Filter Buttons */}
//           <FilterButtons
//             filter={filter}
//             onFilterChange={setFilter}
//             totalCount={counts.total}
//             activeCount={counts.active}
//             completedCount={counts.completed}
//           />
//         </View>

//         {/* Todo List */}
//         <FlatList
//           data={filteredTodos}
//           renderItem={({ item }) => (
//             <TodoItem
//               item={item}
//               fadeAnim={fadeAnim}
//               onToggle={toggleComplete}
//               onEdit={handleStartEdit}
//               onDelete={handleDeleteTodo}
//             />
//           )}
//           keyExtractor={(item) => item.id}
//           style={{ flex: 1, marginTop: 10 }}
//           contentContainerStyle={{ paddingBottom: 20 }}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={<EmptyState filter={filter} fadeAnim={fadeAnim} />}
//         />

//         {/* Input Section */}
//         <TodoInput
//           text={text}
//           onChangeText={setText}
//           onAdd={handleAddTodo}
//           onUpdate={handleUpdateTodo}
//           editingId={editingId}
//           onCancel={handleCancelEdit}
//         />
//       </View>
//     </SafeAreaView>
//   );
// }