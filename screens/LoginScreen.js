import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";
import {
  auth,
  loginUserWithEmailAndPassword,
  registerUserWithEmailAndPassword,
} from "../firebase/firebase";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace("HomeScreen");
      }
    });

    return unsubscribed;
  }, []);

  const handleSignUp = async () => {
    if (email.length * password.length === 0) {
      alert("Please fill all required fields");
    } else {
      const authResult = await registerUserWithEmailAndPassword(
        email,
        password
      );

      if (authResult.error != null) {
        alert(authResult.error);
      }
    }
  };

  const handleLogin = async () => {
    if (email.length * password.length === 0) {
      alert("Please fill all required fields");
    } else {
      const authResult = await loginUserWithEmailAndPassword(email, password);

      if (authResult.error != null) {
        alert(authResult.error);
      }
    }
  };

  const handleGoogleLogin = async () => {};

  const handleFacebookLogin = async () => {};

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.loginButton]}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.registerButton]}
        >
          <Text style={styles.registerButtonText}>Register</Text>
        </TouchableOpacity>

        <View style={styles.socialMediaButtons}>
          <TouchableOpacity>
            <Image
              style={styles.socialMediaIcon}
              source={require("../assets/google-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.socialMediaIcon}
              source={require("../assets/facebook-icon.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 120,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#0782F9",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  registerButton: {
    backgroundColor: "white",
    marginTop: 8,
    borderWidth: 2,
    borderColor: "#0782F9",
  },
  registerButtonText: {
    color: "#0782F9",
    fontSize: 16,
    fontWeight: "700",
  },
  socialMediaButtons: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 8,
  },
});
