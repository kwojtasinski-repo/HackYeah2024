import pinia from '@/plugins/pinia';
import { useMainStore } from '@/stores/useMainStore';
const store = useMainStore(pinia);
import { bus } from '@/plugins/bus';

export const runProgressTest = async () => {
    for (let i = 0; i <= 100; i += 5) {
        store.progressValue = i;
        if (i === 100) {
            bus.emit('dialog:displaySuccessDialog');
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
};
