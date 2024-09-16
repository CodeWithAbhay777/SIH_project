const mongoose = require("mongoose");
const scientistBquestionBank = require("./models/scientistB.js");


main().then(res => console.log("DB connected"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/sihproject');
}

let template = [
    {
        question: "What is the difference between RISC and CISC architectures? Which one is more suitable for embedded systems and why?",

        realAnswer: `RISC (Reduced Instruction Set Computing) and CISC (Complex Instruction Set Computing) are two different types of microprocessor architectures, each with its own approach to handling instructions and performing computations. Here's a comparison between the two:

1. Instruction Set
RISC:
            Simplified instruction set: RISC processors use a small, highly optimized set of instructions, each designed to be executed in a single clock cycle.
Fixed instruction length: RISC instructions are typically of uniform size, which simplifies decoding and execution.

            CISC:
        Complex instruction set: CISC processors have a larger, more complex set of instructions.Some instructions can execute multiple operations or complex tasks within a single instruction.
Variable instruction length: CISC instructions vary in size, allowing for a wide range of operations.

2. Execution Time
RISC:
            Single - cycle execution: Most instructions in RISC architectures can be executed in one clock cycle, leading to a higher instruction throughput.
                Load / Store architecture: Memory operations(load/ store) are separated from computational operations, improving efficiency.

        CISC:
    Multi - cycle execution: Some CISC instructions may take several clock cycles to execute, as they can perform more complex tasks.
        Memory - to - memory operations: CISC allows operations directly on memory without needing to load data into registers first.

3. Pipelining and Performance
RISC:
    Efficient pipelining: The simplicity and uniformity of RISC instructions make them well - suited for pipelining, where multiple instruction stages are processed simultaneously.
High performance per watt: Due to the simplified and fast execution, RISC processors are typically more energy - efficient.

    CISC:
Less efficient pipelining: The complexity and variable length of CISC instructions make pipelining more difficult and less efficient.
High performance for specific tasks: CISC can perform complex operations more directly, which might reduce the number of instructions needed for some tasks, potentially improving performance for specific applications.

4. Hardware Complexity
RISC:
Simpler hardware: The design of RISC processors is generally simpler, with fewer transistors dedicated to decoding and executing instructions.
Large number of registers: RISC processors often have a larger number of registers to keep data close to the processor, minimizing memory access.

    CISC:
Complex hardware: CISC processors require more complex hardware to handle the wide range of instructions and their varied execution paths.
Smaller number of registers: CISC architectures typically have fewer registers, relying more on direct memory access for operations.

5. Software and Compiler Dependency
RISC:
Compiler optimization: RISC relies heavily on compiler efficiency to optimize code, as the simplified instruction set shifts more of the burden onto the software.
More instructions per task: Due to the simplicity of instructions, RISC may require more instructions to perform the same task as a CISC processor.

    CISC:
Complex instructions: CISC can handle more complex operations in hardware, which can reduce the need for complex compiler optimization.
Fewer instructions per task: CISC processors can accomplish more with fewer instructions, often translating to more compact code.

* Suitability for Embedded Systems
RISC is generally more suitable for embedded systems.Here's why:

1.Energy Efficiency:

Embedded systems often have stringent power consumption requirements.RISC architectures are typically more power - efficient due to their simpler instruction set and single - cycle execution, making them ideal for battery - powered or energy - constrained devices.

2.Simplicity and Scalability:

The simplicity of RISC architectures leads to smaller, less complex processors, which can be more easily integrated into small form - factor devices commonly found in embedded systems.

3.Performance Per Watt:

RISC processors offer a higher performance per watt ratio, which is crucial for embedded applications that need to deliver adequate performance while maintaining low power consumption.

4.Pipelining and Speed:

The efficient pipelining in RISC processors allows for faster processing speeds, which is beneficial for real - time embedded applications that require quick and consistent response times.

* CISC processors, on the other hand, might be more suitable for desktop and server environments where complex operations and instruction - level efficiency are more critical, and power consumption is less of a concern.

`,



    },


    {
        question: "Compare and contrast Frequency Modulation (FM) and Amplitude Modulation (AM). What are the pros and cons of each ?",

        realAnswer: `Frequency Modulation (FM) and Amplitude Modulation (AM) are two widely used techniques for encoding information onto a carrier wave for transmission over various communication channels, particularly in radio broadcasting. Here's a comparison between the two:

1. Basic Principle
 FM (Frequency Modulation):
In FM, the frequency of the carrier wave is varied in accordance with the instantaneous amplitude of the input signal.
The amplitude of the carrier wave remains constant.

AM (Amplitude Modulation):
In AM, the amplitude of the carrier wave is varied in proportion to the instantaneous amplitude of the input signal.
The frequency of the carrier wave remains constant.

2. Signal Representation
FM:
The information is encoded in the frequency variations, so the distance between successive peaks of the wave changes.
AM:
The information is encoded in the amplitude variations, so the height of the wave changes, but the spacing between peaks remains the same.

3. Bandwidth Requirements
FM:
FM typically requires a larger bandwidth. The bandwidth needed is proportional to the frequency deviation and the highest frequency in the modulating signal (often described by Carson's rule).
FM radio usually requires around 200 kHz bandwidth.
AM:
AM requires less bandwidth compared to FM. The bandwidth is typically twice the maximum frequency of the modulating signal.
AM radio typically requires around 10 kHz bandwidth.

4. Noise Immunity
FM:
FM is more resistant to noise and interference. Since noise generally affects amplitude rather than frequency, FM signals can be more easily distinguished from noise.
AM:
AM is more susceptible to noise and interference, as both the signal and noise affect the amplitude. This makes AM signals more prone to distortion.

5. Sound Quality
FM:
FM generally provides better sound quality and fidelity, especially for music broadcasting. This is because FM is less affected by noise and can transmit higher fidelity signals.
AM:
AM provides lower sound quality, often with reduced dynamic range and higher susceptibility to noise. However, it is still widely used for talk radio, news, and some music broadcasts.

6. Transmission Range
FM:
FM signals have a shorter transmission range and are typically line-of-sight. They don't travel as far as AM signals, especially in urban areas with obstacles.
AM:
AM signals can travel longer distances, especially at night when they can reflect off the ionosphere (a phenomenon known as "skywave" propagation). This allows AM stations to reach listeners far beyond the immediate vicinity of the transmitter.

7. Power Efficiency
FM:
FM transmitters are less power-efficient because the signal requires constant carrier amplitude, and the variation in frequency requires more complex circuitry.
AM:
AM transmitters are generally more power-efficient, as the carrier and sidebands are simpler to generate and modulate.

8. Commercial Use and Applications
FM:
Primarily used for high-fidelity broadcasts such as music (FM radio), and in television sound broadcasting.
Also used in other communication systems, like two-way radios and VHF communication.
AM:
Commonly used for broadcasting news, talk shows, and sports. AM is also used in aviation communication and long-distance communication (shortwave radio).

Pros and Cons
Feature                FM	                  AM
Pros:	     - Better sound quality (fidelity)	- Longer transmission range
             - More resistant to noise	        - Simpler and more power-efficient transmitters

Cons:	     - Requires more bandwidth	        - More prone to noise and interference
             - Shorter transmission range	        - Lower sound quality
`
    },


    {
        question: "What is the difference between analog and digital communication ?",

        realAnswer: `Analog communication uses continuous signals that vary in amplitude, frequency or phase to represent information. Examples include AM/FM radio and analog telephone networks. The main disadvantages are susceptibility to noise and limited transmission distance.
Digital communication uses discrete signals (typically binary 1s and 0s) to represent information. Examples include WiFi, Bluetooth and 4G/5G cellular networks. Digital signals are more robust against noise and can be regenerated to allow for longer transmission distances. However, digital systems require more bandwidth than analog for the same quality of transmission.`
    },


    {
        question: "Explain the working of a GPS system.",

        realAnswer: `GPS (Global Positioning System) is a satellite-based navigation system that provides location and time information to GPS receivers.
It consists of a network of 24 satellites orbiting the Earth at an altitude of about 20,200 km. Each satellite continuously transmits microwave signals containing the satellite's location and the exact time.
A GPS receiver on Earth measures the time it takes for the signal to reach from multiple satellites. By knowing the signal travel time and the speed of light, the receiver can calculate its distance from each satellite.
With distance measurements from at least four satellites, the receiver can determine its latitude, longitude and altitude using trilateration. The more satellites it can "see", the more accurate the location fix.`
    },


    {
        question: "What is the difference between a multimeter and a voltmeter?",

        realAnswer: `A multimeter is an electronic measuring instrument that combines multiple measurement functions into a single unit. It can measure voltage, current, resistance and sometimes other quantities like capacitance and frequency.
A voltmeter is a more specialized instrument that only measures voltage. It is designed to measure the potential difference between two points in an electrical or electronic circuit.
The key differences are:
Multimeters have multiple ranges and functions, voltmeters are more limited
Multimeters have higher impedance to minimize loading of the circuit, voltmeters have even higher impedance
Multimeters are more versatile but may be less accurate than dedicated voltmeters for precise voltage measurements`
    },


    {
        question: "Explain the working of a radar system.",

        realAnswer: `RADAR (Radio Detection and Ranging) is a detection system that uses radio waves to determine the range, angle, and velocity of objects.
It works by transmitting radio waves and analyzing the reflected signals from objects in its coverage area. The reflected signals are picked up by the radar receiver.
By measuring the time delay between transmission and reception, the radar can calculate the distance to the target using the known speed of the radio waves.
The Doppler effect is used to determine the radial velocity of the target relative to the radar. The frequency shift of the reflected signal is proportional to the target's speed.
Radar systems are used for various applications like air traffic control, weather monitoring, and military target tracking.`
    },

    {
        question: "Describe the different types of analog to digital converters.",

        realAnswer: `Flash ADC: Also known as parallel ADC, it is the fastest type. It uses 2^n comparators to simultaneously compare the input signal with 2^n reference voltages. The digital output is generated in a single clock cycle, making it suitable for high-speed applications. However, it requires a large number of comparators, making it power-hungry and expensive for high resolution.
Successive Approximation ADC: It uses a successive approximation register (SAR) to perform binary search. The input signal is compared to a series of reference voltages generated by an on-chip DAC. The SAR adjusts the DAC output in successive steps to converge to the final digital output. SAR ADCs offer a good balance of speed, resolution and power consumption.
Sigma-Delta ADC: It uses oversampling and digital filtering to achieve high resolution. The input signal is modulated by a 1-bit DAC and integrated. The integrator output is then digitized by a comparator. The 1-bit output is filtered and decimated to produce the final digital output. Sigma-Delta ADCs are popular for audio and sensor applications requiring high resolution.`
    },


    {
        question: "Explain the difference between an op-amp and a comparator.",

        realAnswer: `Op-amp (operational amplifier) is a high-gain differential amplifier that amplifies the difference between its two inputs. It has very high input impedance and very low output impedance. Op-amps are used in various analog circuits like amplifiers, filters, oscillators, etc.
Comparator is a circuit that compares an input voltage to a reference voltage and outputs a digital high or low signal depending on which is larger. Comparators have lower input impedance than op-amps. They are used for analog-to-digital conversion, zero-crossing detection, Schmitt triggers, etc.`
    },

    {

        question: "Explain the working of a phase-locked loop (PLL).",

        realAnswer: `PLL is a control system that generates an output signal whose phase is related to the phase of an input signal. It consists of a phase detector, loop filter, voltage-controlled oscillator (VCO) and a feedback divider.
The phase detector compares the phases of the input signal and the VCO output. The loop filter smoothens the error signal which is used to control the VCO frequency.
The VCO generates an oscillating signal whose frequency depends on the control voltage. The feedback divider divides the VCO output frequency to match the input frequency.
The PLL locks onto and tracks the input signal's frequency and phase. PLLs are used for frequency synthesis, clock recovery, FSK demodulation, etc`
    },


    {

        question: "What is the difference between a MOSFET and a BJT?",

        realAnswer: `MOSFET (Metal-Oxide-Semiconductor Field-Effect Transistor) is a voltage-controlled device that regulates current flow between source and drain terminals based on the electric field applied to the gate terminal. MOSFETs have very high input impedance and are majority carrier devices.
BJT (Bipolar Junction Transistor) is a current-controlled device that uses both electrons and holes to conduct current between collector and emitter terminals. BJTs have lower input impedance and are minority carrier devices.
MOSFETs are better for switching and amplification at high frequencies, while BJTs are more suitable for high power applications and low noise amplifiers.`
    },


    {
        question: "Explain the working of a microwave oven.",

        realAnswer: `Microwave ovens use a magnetron to generate microwaves at a frequency of 2.45 GHz. The magnetron is a vacuum tube that generates high-frequency oscillations using the interaction of electrons with a magnetic field.
The microwaves are directed into the cooking chamber by a waveguide. Water molecules in the food absorb the microwave energy and vibrate, generating heat through molecular friction.
The microwaves reflect off the metal walls of the chamber and penetrate the food, heating it from the inside out. A turntable rotates the food to ensure even heating.
A microprocessor controls the cooking time and power level. Microwaves are non-ionizing and safe for cooking, but can cause burns if exposed to the leaking radiation.`

    },

    {
        question: "What is the difference between a SRAM and a DRAM?",

        realAnswer: `SRAM (Static RAM) uses a flip-flop circuit to store each bit of data. It is faster, more reliable and consumes less power than DRAM. However, SRAM is more expensive and has lower density.
DRAM (Dynamic RAM) stores each bit as a charge in a capacitor. It requires periodic refreshing to retain data. DRAM is slower and less reliable, but cheaper and has higher density compared to SRAM.
SRAM is used for cache memory in processors, while DRAM is used for main memory. DRAM requires a memory controller to handle refreshing and accessing the memory cells.`
    },



    {
        question : "Explain the working of a fiber optic communication system.",

        realAnswer : `In fiber optic communication, an optical transmitter converts an electrical signal into light using a laser or LED. The light is coupled into a fiber optic cable made of glass or plastic.
The light propagates through the fiber by total internal reflection. The fiber has a higher refractive index core surrounded by a lower refractive index cladding layer.
At the receiver end, a photodetector like a photodiode converts the light signal back into an electrical signal. Fiber optic systems use wavelengths around 1310 nm or 1550 nm where fiber attenuation is minimum.
Fiber optic links offer high bandwidth, low loss, immunity to electromagnetic interference, and long transmission distances compared to copper cables. They are widely used in telecom networks, cable TV and internet backbones.`
    },


    {
        question : "What is the difference between a multiplexer and a demultiplexer?",

        realAnswer : `Multiplexer is a combinational logic circuit that combines multiple input signals onto a single output line. It has multiple data inputs, a single output, and selection lines to choose which input to connect to the output.
Demultiplexer is the opposite of a multiplexer. It has a single data input and multiple output lines. Based on the selection lines, it routes the input signal to one of the output lines while the other outputs remain inactive.
Multiplexers are used for data transmission over a single line, while demultiplexers are used for distributing a signal to one of many destinations. They are building blocks of memory and other digital systems.`
    }

]



scientistBquestionBank.insertMany(template);