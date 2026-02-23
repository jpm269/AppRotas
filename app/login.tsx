import { router } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailOk = useMemo(() => {
    const e = email.trim().toLowerCase();
    return e.includes("@") && e.includes(".") && e.length >= 5;
  }, [email]);

  const passwordOk = password.length >= 6;
  const canSubmit = emailOk && passwordOk;

  function onSubmit() {
    if (!canSubmit) {
      Alert.alert("Erro", "Verifica o email e a password (mín. 6 caracteres).");
      return;
    }

    router.replace("/(tabs)"); // vai para as tabs
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Entrar</Text>
        <Text style={styles.subtitle}>Bem-vindo 👋</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="teuemail@exemplo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            returnKeyType="next"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="mín. 6 caracteres"
            secureTextEntry
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />

          <Pressable
            onPress={onSubmit}
            disabled={!canSubmit}
            style={({ pressed }) => [
              styles.button,
              !canSubmit && styles.buttonDisabled,
              pressed && canSubmit && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Pressable onPress={() => Alert.alert("Recuperar", "Em breve 😄")}>
            <Text style={styles.link}>Esqueci-me da password</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Dica: email válido + password com 6+ caracteres.
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, gap: 6, backgroundColor: "#ffffffff" },
  title: { fontSize: 32, fontWeight: "800" },
  subtitle: { fontSize: 16, opacity: 0.7, marginBottom: 18 },

  card: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 18,
    padding: 16,
    gap: 10,
    backgroundColor: "#fff",
  },

  label: { fontSize: 14, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  button: {
    marginTop: 6,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#111",
    backgroundColor: "#111",
  },
  buttonDisabled: { opacity: 0.4 },
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  link: { marginTop: 6, fontSize: 14, fontWeight: "600" },
  footer: { marginTop: 18, fontSize: 12, opacity: 0.6, textAlign: "center" },
});