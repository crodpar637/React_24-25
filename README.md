# React_24-25
Proyectos React hechos en clase - 2ºDAM - 2024/2025

### **Resumen para configurar la sincronización de proyectos en GitHub desde VSCode**  

1. **Configurar Git en tu máquina:**
   - Asegúrate de que tu usuario y correo estén configurados correctamente:
     ```bash
     git config --global user.name "tu_nombre_de_usuario"
     git config --global user.email "tu_correo_de_github"
     ```
   - Si estás utilizando HTTPS, asegúrate de estar logueado con las credenciales correctas. Si es necesario, elimina las credenciales antiguas de tu gestor de credenciales y usa un [token de acceso personal (PAT)](https://github.com/settings/tokens) como contraseña.

---

2. **Configurar el repositorio:**
   - Inicializa el repositorio si aún no lo has hecho:
     ```bash
     git init
     ```
   - Agrega y configura un archivo `.gitignore` en la carpeta raíz del proyecto (`React`):
     ```plaintext
     node_modules/
     desktop.ini
     ```
   - Añade los archivos al índice y realiza el primer commit:
     ```bash
     git add .
     git commit -m "Initial commit"
     ```

---

3. **Conectar con GitHub:**
   - Crea un repositorio en GitHub y conéctalo con tu proyecto local:
     ```bash
     git remote add origin <URL_DEL_REPOSITORIO>
     git branch -M main
     git push -u origin main
     ```

---

4. **Eliminar `desktop.ini` y evitar que se incluya en el repositorio:**
   - Ejecuta este comando en PowerShell para eliminar todos los archivos `desktop.ini`:
     ```powershell
     Get-ChildItem -Path . -Recurse -Filter "desktop.ini" | Remove-Item -Force
     ```
   - Si `desktop.ini` ya está rastreado por Git, elimínalo del índice:
     ```bash
     git rm --cached -r --ignore-unmatch "desktop.ini"
     git commit -m "Remove desktop.ini"
     ```

---

5. **Sincronización automática en GitHub:**
   - Configura VSCode con la opción **Auto Save** para guardar los archivos automáticamente.
   - Usa tareas en VSCode o comandos manuales para realizar `git add`, `commit` y `push` según sea necesario:
     ```bash
     git add .
     git commit -m "Auto save changes"
     git push
     ```

---

Tus alumnos podrán clonar el repositorio y descargar los cambios con:
```bash
git clone <URL_DEL_REPOSITORIO>
git pull
``` 
