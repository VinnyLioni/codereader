<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { QrcodeStream  } from 'vue-qrcode-reader'
    import { useBarStore } from '../../store/barcode'
    import sideMenuOption from '../custom/sideMenuOption.vue';

    const barStore = useBarStore()

    const newCodeInserted = ref<boolean>(false)

    const clearNewCodeInserted = () => {
        setTimeout(() => {
            newCodeInserted.value=false
        }, 1000)
    }
      
    const onDetect = (detectedCodes: any) => {
        if (detectedCodes.length > 0) {
            const firstCode = {
                rawValue: detectedCodes[0].rawValue,
                format: detectedCodes[0].format.toUpperCase()
            }
            barStore.codebar = firstCode
            console.log('codigos', barStore.codebar)
            barStore.codeHistory.push(firstCode)
            newCodeInserted.value=true
            clearNewCodeInserted()
            barStore.showToast('success', `Código ${barStore.codebar.rawValue} lido com sucesso.`)
            console.log('historico', barStore.codeHistory)
        } else {
            barStore.codebar=''
        }
    }

    const facingMode = ref<any>('environment')
    const switchCamera = () => {
        switch (facingMode.value) {
            case 'environment': facingMode.value='user'
                break
            case 'user': facingMode.value='environment'
                break
        }
    }
    
    const selectedDevice = ref<any>(null)
    const devices = ref<any>([])
    const allDevices = ref<any>([])

    onMounted(async () => {
        const mediaDevices = await navigator.mediaDevices.enumerateDevices()
        const videoDevices = mediaDevices.filter(({ kind }) => kind === 'videoinput')

        allDevices.value=await navigator.mediaDevices.enumerateDevices()

        videoDevices.forEach((device: any, index) => {
            ;;
            device.index = index
            devices.value.push(device)
        })

        if (devices.value.length > 0) {
            selectedDevice.value = devices.value[0]
        }

        if (devices.value.length > 1) {
            selectedDevice.value = devices.value[devices.value.length - 1]
        }
        console.log(devices)
        console.log(allDevices.value)
    })

    const paintOutline = (detectedCodes: any, ctx: any) => {
        for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints
    
        ctx.strokeStyle = 'red'
    
        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
        }
    }

    const paintBoundingBox = (detectedCodes: any, ctx: any) => {
        for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode
    
        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
        }
    }

    const paintCenterText = (detectedCodes: any, ctx: any) => {
        for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode
    
        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2
    
        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
    
        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'
    
        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)
    
        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
        }
    }

    const trackFunctionOptions = [
        { text: 'nothing (default)', value: undefined },
        { text: 'outline', value: paintOutline },
        { text: 'centered text', value: paintCenterText },
        { text: 'bounding box', value: paintBoundingBox }
    ]

    const trackFunctionSelected = ref(trackFunctionOptions[1])
  
    const barcodeFormats = ref<any>({
        aztec: false,
        code_128: true,
        code_39: false,
        code_93: false,
        codabar: false,
        databar: false,
        databar_expanded: false,
        data_matrix: false,
        dx_film_edge: false,
        ean_13: true,
        ean_8: false,
        itf: false,
        maxi_code: false,
        micro_qr_code: false,
        pdf417: false,
        qr_code: true,
        rm_qr_code: false,
        upc_a: false,
        upc_e: false,
        linear_codes: false,
        matrix_codes: false
    })

    const selectedBarcodeFormats = computed(() => {
        return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
    })

    const error = ref('')
    
    const onError = (err: any) => {
        error.value = `[${err.name}]: `
    
        if (err.name === 'NotAllowedError') {
        error.value += 'you need to grant camera access permission'
        } else if (err.name === 'NotFoundError') {
        error.value += 'no camera on this device'
        } else if (err.name === 'NotSupportedError') {
        error.value += 'secure context required (HTTPS, localhost)'
        } else if (err.name === 'NotReadableError') {
        error.value += 'is the camera already in use?'
        } else if (err.name === 'OverconstrainedError') {
        error.value += 'installed cameras are not suitable'
        } else if (err.name === 'StreamApiNotSupportedError') {
        error.value += 'Stream API is not supported in this browser'
        } else if (err.name === 'InsecureContextError') {
        error.value +=
            'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
        } else {
        error.value += err.message
        }
    }

    const newRoute = () => {
        window.open('https://vini-portfoil.web.app/')
    }

    const wpp = () => {
        window.open('https://api.whatsapp.com/send?phone=5511981080308&text=Ol%C3%A1,%20gostaria%20de%20saber%20sobre%20o%20leitor', '_blank')
    }


</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <div class="shadow-md shadow-slate-950 relative min-w-[21.5rem] max-w-[21.5rem] sm:min-w-[30rem] mx-1 min-h-96 max-h-96 sm:min-h-[40rem] sm:max-h-[40rem] mt-1 overflow-hidden rounded-md border-slate-600 border-[0.2rem]">
            <QrcodeStream 
                :constraints="{ deviceId: selectedDevice.deviceId, facingMode}"
                :track="trackFunctionSelected.value"
                :formats="selectedBarcodeFormats"
                @error="onError"
                @detect="onDetect"
                v-if="selectedDevice !== null"
            />
            <button @click="switchCamera" class="rounded-full bg-slate-400 w-10 h-10 p-6 absolute right-6 top-6 flex justify-center items-center">
                <i class="fas fa-camera-rotate text-slate-900 text-2xl"></i>
            </button>
        </div>
    </div>
    <div class="p-2 w-[22.5rem] flex flex-col gap-2">
        <div class="w-full flex flex-col rounded-md shadow-md shadow-slate-950">
            <span class="bg-slate-600 px-2 font-semibold text-lg rounded-tr-md rounded-tl-md text-center text-slate-100">Código Identificado</span>
            <div v-if="!barStore.codebar" class="text-slate-100 py-2 text-md tracking-tighter text-center border-[0.2rem] border-slate-600 rounded-br-md rounded-bl-md">Aguardando leitura.</div>
            <div v-else class="text-slate-100 py-2 text-sm tracking-tighter text-center border-[0.2rem] rounded-br-md rounded-bl-md border-slate-600" :class="newCodeInserted ? 'bg-green-600 text-slate-100' : ''">{{ barStore.codebar.rawValue }}</div>
        </div>
        <div class="w-full flex flex-col rounded-md shadow-md shadow-slate-950">
            <span class="bg-slate-600 px-2 font-semibold text-lg rounded-tr-md rounded-tl-md text-center text-slate-100">Formato do Código</span>
            <div v-if="!barStore.codebar" class="text-slate-100 py-2 tracking-tighter text-center border-[0.2rem] rounded-bl-md rounded-br-md border-slate-600" :class="newCodeInserted ? 'bg-green-600 text-slate-100' : ''">Aguardando leitura.</div>
            <div v-else class="text-slate-100 py-2 tracking-tighter text-center border-[0.2rem] rounded-bl-md rounded-br-md border-slate-600" :class="newCodeInserted ? 'bg-green-600 text-slate-100' : ''">{{ barStore.codebar.format }}</div>
        </div>
        <div class="hidden sm:flex flex-row gap-2 mt-auto">
            <sideMenuOption title="Portfólio" icon="fas fa-angle-left text-slate-100" @click="newRoute" custom="text-sm text-center px-6 bg-slate-600" text="text-slate-100"/>
            <sideMenuOption title="Contato" icon="fab fa-whatsapp text-slate-100" @click="wpp" custom="text-sm text-center px-6 bg-slate-600" text="text-slate-100"/>
        </div>
    </div>
</template>