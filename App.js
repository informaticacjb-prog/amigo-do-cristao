// App.js
import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { Audio } from 'expo-av';

const Tab = createBottomTabNavigator();

// ==== Telas Principais ====
function TelaVideos() {
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>🎥 Vídeos Gospel</Text>
    </SafeAreaView>
  );
}

function TelaMusicas() {
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>🎵 Músicas Cristãs</Text>
    </SafeAreaView>
  );
}

function TelaBiblia() {
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>📖 Bíblia Sagrada</Text>
    </SafeAreaView>
  );
}

function TelaNoticias() {
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>📰 Notícias Cristãs</Text>
    </SafeAreaView>
  );
}

function TelaMensagemDiaria() {
  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>💬 Mensagem Diária</Text>
    </SafeAreaView>
  );
}

// ==== Tela Inicial com Música e Animação ====
function TelaInicial({ onFinish }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState(null);

  useEffect(() => {
    // Efeito de fade-in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

    // Tocar música de fundo
    async function playSound() {
      const { sound } = await Audio.Sound.createAsync(
        require('./assets/intro.mp3'), // adicione um arquivo MP3 suave em /assets/intro.mp3
        { shouldPlay: true, volume: 0.6 }
      );
      setSound(sound);
    }
    playSound();

    // Transição automática após 6 segundos
    const timer = setTimeout(() => {
      stopAndContinue();
    }, 6000);

    return () => {
      clearTimeout(timer);
      if (sound) sound.unloadAsync();
    };
  }, []);

  async function stopAndContinue() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }
    onFinish();
  }

  return (
    <View style={estilos.inicialContainer}>
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Image
          source={require('./assets/logo.png')}
          style={estilos.logo}
          resizeMode="contain"
        />
        <Text style={estilos.appNome}>Amigo do Cristão</Text>
        <Text style={estilos.versiculo}>
          “O Senhor é o meu pastor, nada me faltará.”{'\n'}
          <Text style={{ fontSize: 14, color: '#d4af37' }}>Salmos 23:1</Text>
        </Text>

        <TouchableOpacity style={estilos.botaoPular} onPress={stopAndContinue}>
          <Text style={estilos.textoBotao}>Pular introdução ⏩</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// ==== Navegação Principal ====
function NavegacaoPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#d4af37',
        tabBarInactiveTintColor: '#2f4f4f',
        tabBarStyle: {
          backgroundColor: '#f4f7fa',
          borderTopColor: '#d4af37',
          height: 60,
          paddingBottom: 6,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Vídeos':
              iconName = 'videocam';
              break;
            case 'Músicas':
              iconName = 'musical-notes';
              break;
            case 'Bíblia':
              iconName = 'book';
              break;
            case 'Notícias':
              iconName = 'newspaper';
              break;
            case 'Mensagem Diária':
              iconName = 'chatbubble-ellipses';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Vídeos" component={TelaVideos} />
      <Tab.Screen name="Músicas" component={TelaMusicas} />
      <Tab.Screen name="Bíblia" component={TelaBiblia} />
      <Tab.Screen name="Notícias" component={TelaNoticias} />
      <Tab.Screen name="Mensagem Diária" component={TelaMensagemDiaria} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [mostrarInicial, setMostrarInicial] = useState(true);

  return (
    <NavigationContainer>
      {mostrarInicial ? (
        <TelaInicial onFinish={() => setMostrarInicial(false)} />
      ) : (
        <NavegacaoPrincipal />
      )}
    </NavigationContainer>
  );
}

// ==== Estilos ====
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    color: '#2f4f4f',
    fontWeight: 'bold',
  },
  inicialContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f7fa',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  appNome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2f4f4f',
  },
  versiculo: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#2f4f4f',
    fontStyle: 'italic',
  },
  botaoPular: {
    marginTop: 40,
    backgroundColor: '#d4af37',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
