import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import styles from "../../assets/styles/login.styles";
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';
import { Link } from "expo-router";
import { useAuthStore } from '../../authStore/authStore';
import { Alert } from "react-native";


export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoading, login} = useAuthStore();

  const handleLogin = async () => {
    const result = await login(email, password);

    if (!result.success) Alert.alert("Error", result.error);
  };

  return (
    <KeyboardAvoidingView
    style={{flex:1}}
    behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
      {/* ILLUSTRAÇÃO */}
      <View style={styles.topIllustration}>
        <Image 
          source={require("../../assets/images/i.png")}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      </View>

      {/* FORM */}
      <View style={styles.formContainer}>
        {/* EMAIL */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputContainer}>
            <Ionicons 
              name="mail-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            <TextInput 
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor={COLORS.placeholderText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        {/* SENHA */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputContainer}>
            {/* icone cadeado */}
            <Ionicons 
              name="lock-closed-outline"
              size={20}
              color={COLORS.primary}
              style={styles.inputIcon}
            />
            {/* INPUT */}
            <TextInput 
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor={COLORS.placeholderText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />

            <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
            >
            <Ionicons
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            size={20}
            color={COLORS.primary}
            />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}
        disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}> Não tem uma conta?</Text>
          <Link href="/signup" asChild>
          <TouchableOpacity>
            <Text style={styles.link}> Cadastre-se</Text>
            </TouchableOpacity>
            </Link>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
