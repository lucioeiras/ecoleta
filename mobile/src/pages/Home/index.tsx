import React, { useState, useEffect, ChangeEvent } from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { Feather as Icon} from '@expo/vector-icons'; 
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');
  
  const navigation = useNavigation();

  function handleNavigateToPoints() {
    navigation.navigate('Points', { uf: selectedUf, city: selectedCity });
  }

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);

        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios
      .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
      .then(response => {
        const cityNames = response.data.map(city => city.nome);

        setCities(cityNames);
      });
  }, [selectedUf]);

  function handleSelectUf(uf: string) {
    setSelectedUf(uf);
  }

  function handleSelectCity(city: string) {
    setSelectedCity(city);
  }
  
  return (
    <ImageBackground 
      style={styles.container} 
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
    > 
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View style={styles.footer}>
        <RNPickerSelect 
          placeholder={{ label: 'Selecione um estado' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
          style={{ 
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5
            }, 
            iconContainer: {
              padding: 20
            }
          }}
          onValueChange={value => handleSelectUf(value)}
          items={ufs.map(uf => ({ label: uf, value: uf }))}
        />

        <RNPickerSelect 
          placeholder={{ label: 'Selecione uma cidade' }}
          Icon={() => <Icon name="chevron-down" size={20} color="#6C6C80" />}
          style={{ 
            placeholder: {
              fontFamily: 'Roboto_400Regular',
              alignItems: 'center',
              fontSize: 16,
              color: '#6C6C80',
            },
            viewContainer: {
              height: 60,
              backgroundColor: '#FFF',
              borderRadius: 10,
              marginBottom: 8,
              paddingHorizontal: 24,
              paddingTop: 5
            }, 
            iconContainer: {
              padding: 20
            },
          }}
          onValueChange={value => handleSelectCity(value)}
          items={cities.map(city => ({ label: city, value: city }))}
        />
        
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
}

export default Home;
