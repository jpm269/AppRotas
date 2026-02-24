type LoginResponse = { token: string };

export async function loginRequest(email: string, password: string) {
  // TODO meter nosso url da api 
  const url = "https://TEU_DOMINIO.com/api/login";

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

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