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
   const [loading, setLoading] = useState(false);

  const emailOk = useMemo(() => {
    const e = email.trim().toLowerCase();
    return e.includes("@") && e.includes(".") && e.length >= 5;
  }, [email]);

  const passwordOk = password.length >= 6;
  const canSubmit = emailOk && passwordOk;

  async function onSubmit() {
    // if (!emailOk || !passwordOk) {
    //   Alert.alert("Erro", "Verifica o email e a password (mín. 6 caracteres).");
    //   return;
    // }

    // try {
    //   setLoading(true);
    //   const token = await loginRequest(email.trim(), password);
    //   await saveToken(token);
    //   router.replace("/(tabs)");
    // } catch (e: any) {
    //   Alert.alert("Login falhou", e?.message ?? "Tenta novamente.");
    // } finally {
    //   setLoading(false);
    // }
    router.replace("/(tabs)");
  }

  function onForgetPassword() {
    Alert.alert("Recuperar", "Em breve 😄")
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Nome do App</Text>
        <Text style={styles.subtitle}>Criar uma conta</Text>
        <Text style={styles.text}>Insira seu e-mail para se cadastrar neste aplicativo</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="email@dominio.com"
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

          <Pressable onPress={onSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Entrar</Text>
          </Pressable>

          <Pressable onPress={onForgetPassword}>
            <Text style={styles.link}>Esqueci-me da password</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Ao clicar em continuar, você concorda com os nossos Termos de Serviço e com a Política de Privacidade
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, gap: 6, backgroundColor: "#9D500C" },
  title: { fontSize: 36, marginBottom: 60, fontWeight: "800", color: "#fff", textAlign: "center" },
  subtitle: { fontSize: 16, color: "#fff", textAlign: "center", fontWeight: 600 },
  text: { fontSize: 12, marginBottom: 18, color: "#000", textAlign: "center" },

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
  buttonPressed: { opacity: 0.85 },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },

  link: { marginTop: 6, fontSize: 14, fontWeight: "600" },
  footer: { marginTop: 18, fontSize: 12, textAlign: "center", width: 327 },
});