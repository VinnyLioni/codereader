<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import { QrcodeStream  } from 'vue-qrcode-reader'
    import { useBarStore } from '../../store/barcode'

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
                format: detectedCodes[0].format
            }
            barStore.codebar = firstCode
            console.log('codigos', barStore.codebar)
            barStore.codeHistory.unshift(firstCode)
            newCodeInserted.value=true
            clearNewCodeInserted()
            barStore.showToast('success', `Código ${barStore.codebar} lido com sucesso.`)
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
            // Adiciona um índice ao objeto do dispositivo
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

</script>

<template>
    <div class="flex flex-col justify-center items-center">
        <div class="relative min-w-[23rem] max-w-full min-h-96 max-h-96 mt-1 overflow-hidden rounded-md border-slate-100 border-[2px]">
            <QrcodeStream 
                :constraints="{ deviceId: selectedDevice.deviceId, facingMode}"
                :track="trackFunctionSelected.value"
                :formats="selectedBarcodeFormats"
                @error="onError"
                @detect="onDetect"
                v-if="selectedDevice !== null"
            />
            <button @click="switchCamera" class="rounded-full bg-slate-100 w-10 h-10 p-6 absolute right-6 top-6 flex justify-center items-center">
                <i class="fas fa-camera-rotate text-slate-900 text-2xl"></i>
            </button>
        </div>
    </div>
    <div class="">
        <!-- <table class="border-slate-100 border-[0.1rem] w-[23rem] h-auto">
            <thead class="text-slate-900 bg-slate-100">
                <tr class="text-md font-semibold tracking-tighter">
                    <th class="w-10/12 text-center">Código</th>
                    <th class="w-2/12 text-center">Tipo</th>
                </tr>
            </thead>
            <tbody class="text-slate-100 w-full flex flex-col">
                <tr v-if="barStore.codeHistory.length <= 0" class="text-xs flex justify-center">
                    <td class="p-1 w-10/12">Não há códigos detectados.</td>
                    <td class="p-1 w-2/12"></td>
                </tr>
                <tr v-else v-for="(item, index) in barStore.codeHistory" :key="index" class="py-2 px-12">
                    <td class="text-xs tracking-tighter w-10/12 p-1 border-r-[0.1rem]">{{ item.rawValue }}</td>
                    <td class="text-xs w-2/12 text-center">{{ item.format }}</td>
                </tr>
            </tbody>
        </table> -->
        <table class="w-[23rem] mt-1">
            <thead class="w-full flex">
                <tr class="w-full bg-slate-100 text-slate-900 rounded-tr-md rounded-tl-md py-2 flex justify-center">
                    <!-- <th class="mr-auto w-2/12">Seq.</th> -->
                    <th class="w-10/12 text-sm">Códigos</th>
                    <th class="w-2/12 text-sm">Tipo</th>
                </tr>
            </thead>
            <tbody class="full flex flex-col border-solid border-slate-100 border-[2px] rounded-bl-md rounded-br-md">
                <tr v-if="barStore.codeHistory.length <= 0" class="flex justify-center text-xs text-slate-100 py-2">
                    <td>Nenhuma leitura feita.</td>
                </tr>
                <tr v-else v-for="(item, index) in barStore.codeHistory" :key="index" class="flex justify-start duration-200 ease-in" :class="newCodeInserted && index === 0 ? 'bg-green-600 text-slate-100' : ''">
                    <td class="text-xs px-4 py-2 border-t-2 w-full">{{ item.rawValue }}</td>
                    <td class="text-xs px-4 py-2 border-t-2 w-full">{{ item.format }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>