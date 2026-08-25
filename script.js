/**
 * Máquina 30-30 - Official Contact Page Scripts
 * Handles vCard generation, Lightbox, Web Share API, and QR modal
 */

const WHATSAPP_LINK = "https://api.whatsapp.com/send/?phone=5214494536506&text=Hola,+Me+interesa+conocer+m%C3%A1s+de+M%C3%A1quina+30-30";
const PHONE_NUMBER = "+5214494536506";

// vCard Content Generation
function getVCardString() {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Máquina 30-30",
    "N:30-30;Máquina;;;",
    "TITLE:Restaurante & Food Truck",
    "ORG:Máquina 30-30",
    "TEL;TYPE=CELL,VOICE:" + PHONE_NUMBER,
    "TEL;TYPE=WORK,MSG:" + PHONE_NUMBER,
    "URL;TYPE=WhatsApp:" + WHATSAPP_LINK,
    "URL;TYPE=Grupo WhatsApp:https://chat.whatsapp.com/JLBYVBkWmLa2g9M47j6iwt",
    "URL;TYPE=Maps Matriz:https://maps.app.goo.gl/Hsg26th7Fs9DXAeUA?g_st=ic",
    "URL;TYPE=Maps Food Truck:https://maps.app.goo.gl/foMbReLHWWRxbzrY6?g_st=ic",
    "URL;TYPE=Instagram:https://www.instagram.com/maquina_3030",
    "URL;TYPE=Facebook:https://www.facebook.com/share/1RqmkZFjY4/?mibextid=wwXIfr",
    "URL;TYPE=TikTok:https://www.tiktok.com/@maquina3030",
    "NOTE:Máquina 30-30 - Contacto oficial. Matriz y Food Truck. WhatsApp: " + PHONE_NUMBER,
    "END:VCARD"
  ].join("\r\n");
}

/**
 * Downloads vCard contact file dynamically
 */
function downloadVCard() {
  const vCardData = getVCardString();
  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
  
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blob);
  downloadLink.setAttribute('download', 'Maquina_3030.vcf');
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  
  setTimeout(() => {
    window.URL.revokeObjectURL(downloadLink.href);
  }, 1000);

  showToast("¡Contacto de Máquina 30-30 listo para guardar!");
}

/**
 * Web Share API or Clipboard Copy Fallback
 */
async function shareContact() {
  const shareData = {
    title: 'Máquina 30-30 - Enlaces Oficiales',
    text: 'Contacto oficial y ubicaciones de Máquina 30-30',
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err.name !== 'AbortError') {
        copyLinkToClipboard();
      }
    }
  } else {
    copyLinkToClipboard();
  }
}

function copyLinkToClipboard() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast("Enlace copiado al portapapeles");
  }).catch(() => {
    showToast("WhatsApp: +52 449 453 6506");
  });
}

/**
 * QR Code Modal Handlers
 */
function openQRModal() {
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeQRModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Fullscreen Image Lightbox Handlers
 */
function openImageModal() {
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeImageModal(event) {
  if (event && event.target !== event.currentTarget && !event.target.classList.contains('modal-close')) {
    return;
  }
  const modal = document.getElementById('imageModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/**
 * Toast Notification Utility
 */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  
  toast.textContent = message;
  toast.classList.add('show');
  
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// Close modals on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeQRModal();
    closeImageModal();
  }
});
