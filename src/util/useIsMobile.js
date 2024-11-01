import { ref } from 'vue';

export function useIsMobile() {
  const isMobile = ref(
    /mobile|android|iphone|ipad|iemobile/.test(
      navigator.userAgent.toLowerCase()
    )
  );
  return isMobile;
}
