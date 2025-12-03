-- Adiciona política para usuários deletarem seu próprio perfil (conformidade LGPD)
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);