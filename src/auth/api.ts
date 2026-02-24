type LoginResponse = { token: string };

export async function loginRequest(email: string, password: string) {
  // Troca para o teu endpoint real:
  const url = "https://TEU_DOMINIO.com/api/login";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // Se a API devolve erro:
  if (!res.ok) {
    let msg = "Credenciais inválidas";
    try {
      const data = await res.json();
      msg = data?.message ?? msg;
    } catch {}
    throw new Error(msg);
  }

  const data = (await res.json()) as LoginResponse;
  if (!data?.token) throw new Error("Resposta inválida do servidor");
  return data.token;
}