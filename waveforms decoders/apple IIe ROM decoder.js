// Apple IIe ROM Symbol Decoder
// For Digilent WaveForms (Digital Discovery)
// Pins 0-15 need to be connected to address bus

// Create a custom decoder

// This code goes into the "decoder" tab
c = rgData.length

// Uncomment/change the return in Value to Text tab to see what
// hex values the decoder finds. If they don't match the logic analyzer
// capture, you probably need to reverse la_bit

//la_bit = [8,12,9,13,10,14,11,15,16,20,17,21,18,22,19,23];
la_bit = [23,19,22,18,21,17,20,16,15,11,14,10,13,9,12,8];
print("Starting...");

for(var i = 0; i < c; i++){
    rgValue[i] = 0x0;
    for (var x=0; x<16; x++) {
        var sample = rgData[i] & 0xFFFF00;  // mask off what we don't want. 
        sample = sample >> (la_bit[x]) //  shift the sample all the way to the right, so that LSB is our value
        sample = sample & 0x1;
        if (sample == 0) {
            sample = 0x1;
            sample = sample << x // shift left to position correctly
            sample = sample & 0xFFFF; // mask the top part
            sample = ~sample;          // invert
            rgValue[i] = (rgValue[i] & sample) & 0xFFFF; 
        } else {
            sample = sample << x // shift left to position correctly
            rgValue[i] = rgValue[i] | sample;
       }
    }

   rgFlag[i] = 1;
}
print ("... done");

// This code goes into the "Value2Text" tab
// It is huge. So make sure you copy it all!

function Value2Text(flag, value){
  if (flag >0) {
      switch(value){
        // switches
        case 0x0200: return "IN"
        case 0x03f0: return "BRKV"
        case 0x03f2: return "SOFTEV"
        case 0x03f4: return "PWREDUP"
        case 0x03f8: return "USRADR"
        case 0x03fb: return "NMI"
        case 0x03fe: return "IRQLOC"
        case 0x0400: return "LINE1"
        case 0xc006: return "SETSLOTCXROM"
        case 0xc007: return "SETINTCXROM"
        case 0xc010: return "KBDSTRB"
        case 0xc015: return "RDCXROM"
        case 0xc020: return "TAPEOUT"
        case 0xc050: return "TXTCLR"
        case 0xc051: return "TXTSET"
        case 0xc053: return "MIXSET"
        case 0xc056: return "LORES"
        case 0xc058: return "SETAN0"
        case 0xc05a: return "SETAN1"
        case 0xc060: return "TAPEIN"
        case 0xc064: return "PADDL0"
        case 0xc070: return "PTRIG"
        case 0xe000: return "BASIC"
        case 0xe003: return "BASIC2"
        case 0x0478: return "TEMP1"
        case 0x047b: return "OLDCH"
        case 0x04fb: return "MODE"
        case 0x057b: return "OURCH"
        case 0x05fb: return "OURCV"
        case 0x067b: return "CHAR"
        case 0x06fb: return "XCOORD"
        case 0x077b: return "OLDBASL"
        case 0x07f8: return "ACTV_PERIP_SLOT"
        case 0x07fb: return "OLDBASH"
        case 0xc000: return "CLR80COL"
        case 0xc000: return "KBD"
        case 0xc001: return "SET80COL"
        case 0xc002: return "RDMAINRAM"
        case 0xc003: return "RDCARDRAM"
        case 0xc004: return "WRMAINRAM"
        case 0xc005: return "WRCARDRAM"
        case 0xc008: return "SETSTDZP"
        case 0xc009: return "SETALTZP"
        case 0xc00b: return "SETSLOTC3ROM"
        case 0xc00c: return "CLR80VID"
        case 0xc00d: return "SET80VID"
        case 0xc00e: return "CLRALTCHAR"
        case 0xc00f: return "SETALTCHAR"
        case 0xc010: return "KBDSTRB"
        case 0xc011: return "RDLCBNK2"
        case 0xc012: return "RDLCRAM"
        case 0xc013: return "RDRAMRD"
        case 0xc014: return "RDRAMWRT"
        case 0xc018: return "RD80COL"
        case 0xc01a: return "RDTEXT"
        case 0xc01c: return "RDPAGE2"
        case 0xc01f: return "RD80VID"
        case 0xc030: return "SPKR"
        case 0xc054: return "TXTPAGE1"
        case 0xc055: return "TXTPAGE2"
        case 0xc05d: return "CLRAN2"
        case 0xc05f: return "CLRAN3"
        case 0xc061: return "BUTN0"
        case 0xc062: return "BUTN1"
        case 0xc080: return "LCBANK2_RW"
        case 0xc081: return "ROMIN"
        case 0xc088: return "LCBANK1_RW"
        case 0xc089: return "ROMIN1"
        case 0xcfff: return "CLRROM"
        case 0xfbb3: return "MON_VERSION"
        case 0xfc22: return "MON_VTAB"
        case 0xfc24: return "MON_VTABZ"
        case 0xfc75: return "MON_SNIFFIRQ"
        case 0xfd29: return "MON_FUNCEXIT"
        case 0xfe89: return "MON_SETKBD"
        case 0xfe93: return "MON_SETVID"
        case 0xff58: return "MON_IORTS"


        //Cxxx space from 80 column ROM
        case 0xc100: return "B_FUNC"
        case 0xc107: return "B_FUNCNK"
        case 0xc10e: return "B_FUNCNE"
        case 0xc11f: return "B_OLDFUNC"
        case 0xc129: return "F_CLREOP"
        case 0xc12d: return "CLEOP1"
        case 0xc143: return "F_HOME"
        case 0xc14d: return "F_SCROLL"
        case 0xc153: return "SCRL1"
        case 0xc169: return "SCRL2"
        case 0xc172: return "SCRL3"
        case 0xc17d: return "F_CLREOL"
        case 0xc181: return "CLEOL2"
        case 0xc18a: return "F_SETWND"
        case 0xc19c: return "F_CLEOLZ"
        case 0xc1a1: return "F_GORET"
        case 0xc1a4: return "B_FUNC0"
        case 0xc1c5: return "NOI"
        case 0xc1cd: return "B_SCROLL"
        case 0xc1d3: return "B_CLREOL"
        case 0xc1d9: return "B_CLEOLZ"
        case 0xc1e1: return "B_CLREOP"
        case 0xc1e7: return "B_SETWND"
        case 0xc1ea: return "B_RESET"
        case 0xc1ed: return "B_HOME"
        case 0xc1ff: return "B_VECTOR"
        case 0xc20e: return "B_GETCH"
        case 0xc211: return "B_FUNC1"
        case 0xc219: return "B_SETWNDX"
        case 0xc221: return "B_SETWND2"
        case 0xc22e: return "GOBACK"
        case 0xc234: return "B_RESETX"
        case 0xc252: return "BLAST"
        case 0xc261: return "DIAGS"
        case 0xc264: return "RESETRET"
        case 0xc26e: return "B_ESCFIX"
        case 0xc272: return "ESCFIX2"
        case 0xc27a: return "ESCFIX3"
        case 0xc27d: return "GORETN"
        case 0xc280: return "ESCIN"
        case 0xc284: return "ESCOUT"
        case 0xc288: return "B_KEYIN"
        case 0xc29c: return "B_KEYIN2"
        case 0xc2b5: return "GOTKEY"
        case 0xc2c6: return "KEYDLY"
        case 0xc2cc: return "IK1"
        case 0xc2ce: return "IK2"
        case 0xc2d5: return "IK2A"
        case 0xc2db: return "IK3"
        case 0xc2e6: return "KDRETN"
        case 0xc2e9: return "KDRETY"
        case 0xc2ea: return "KDRET"
        case 0xc2eb: return "F_RETURN"
        case 0xc2f1: return "F_RET1"
        case 0xc2f4: return "X_CLEOLZ"
        case 0xc2f6: return "X_CLEOL2"
        case 0xc2fe: return "ZSPAREC2"
        case 0xc300: return "BASICINT"
        case 0xc305: return "BASICIN"
        case 0xc307: return "BASICOUT"
        case 0xc317: return "BASICENT"
        case 0xc320: return "LC320"
        case 0xc336: return "BASICENT2"
        case 0xc348: return "JBASINIT"
        case 0xc34b: return "JPINIT"
        case 0xc351: return "JPREAD"
        case 0xc357: return "JPWRITE"
        case 0xc35d: return "JPSTAT"
        case 0xc363: return "MOVE"
        case 0xc378: return "MOVEC2M"
        case 0xc37e: return "MOVESTRT"
        case 0xc380: return "MOVELOOP"
        case 0xc38a: return "NXTA1"
        case 0xc398: return "C01"
        case 0xc3a3: return "C03"
        case 0xc3ac: return "MOVERET"
        case 0xc3b0: return "XFER"
        case 0xc3c5: return "XFERC2M"
        case 0xc3cd: return "XFERAZP"
        case 0xc3dc: return "XFERSZP"
        case 0xc3eb: return "SETC8"
        case 0xc803: return "BASICINIT"
        case 0xc813: return "HANG"
        case 0xc816: return "BINIT1"
        case 0xc831: return "BINIT1A"
        case 0xc850: return "BINIT2"
        case 0xc85d: return "CLEARIT"
        case 0xc866: return "C8BASIC"
        case 0xc874: return "C8B2"
        case 0xc87e: return "C8B3"
        case 0xc890: return "C8B4"
        case 0xc896: return "BOUT"
        case 0xc8a1: return "BPRINT"
        case 0xc8b4: return "KBDWAIT"
        case 0xc8c0: return "NOWAIT"
        case 0xc8cc: return "BPNCTL"
        case 0xc8e2: return "BIORET"
        case 0xc8f6: return "BINPUT"
        case 0xc905: return "B_INPUT"
        case 0xc918: return "ESCAPING"
        case 0xc929: return "ESC1"
        case 0xc92b: return "ESC2"
        case 0xc935: return "ESC3"
        case 0xc945: return "ESCSPEC"
        case 0xc954: return "ESCSPEC2"
        case 0xc960: return "ESCNONE"
        case 0xc963: return "ESCSPEC3"
        case 0xc972: return "ESCTAB"
        case 0xc983: return "ESCCHAR"
        case 0xc994: return "PSTATUS"
        case 0xc99e: return "PSTATUS2"
        case 0xc9b0: return "PSTATUS3"
        case 0xc9b4: return "PSTATUS4"
        case 0xc9b7: return "NDESC"
        case 0xc9c6: return "B_NOPICK"
        case 0xc9df: return "B_CHKCAN"
        case 0xc9f7: return "B_FLIP"
        case 0xca02: return "B_CANLIT"
        case 0xca0a: return "B_FIXCHR"
        case 0xca24: return "B_INRET"
        case 0xca27: return "GETPRIOR"
        case 0xca49: return "GPX"
        case 0xca4a: return "PINIT1_0"
        case 0xca4f: return "PINIT"
        case 0xca51: return "PINIT2"
        case 0xca62: return "PIGOOD"
        case 0xca74: return "PREAD"
        case 0xca8a: return "PREADRET2"
        case 0xca8e: return "PWRITE"
        case 0xca9e: return "PWRITE2"
        case 0xcaaf: return "GETY"
        case 0xcacb: return "PWRITE3"
        case 0xcadc: return "STARTXY"
        case 0xcaeb: return "PWRITE4"
        case 0xcb09: return "PWWRAP"
        case 0xcb0f: return "PWRITERET"
        case 0xcb15: return "GETKEY"
        case 0xcb1b: return "GETK2"
        case 0xcb24: return "TESTCARD"
        case 0xcb48: return "STAY2"
        case 0xcb4d: return "STAY80"
        case 0xcb4e: return "TESTFAIL"
        case 0xcb51: return "BASCALC"
        case 0xcb54: return "BASCALCZ"
        case 0xcb55: return "BSCLC1"
        case 0xcb5b: return "BSCLC1A"
        case 0xcb6d: return "BSCLC2"
        case 0xcb7e: return "BASCLC3"
        case 0xcb97: return "BASCLCX"
        case 0xcb99: return "CTLCHAR"
        case 0xcbab: return "CTLCHARX"
        case 0xcbae: return "CTLGO"
        case 0xcbb2: return "CTLRET"
        case 0xcbb6: return "CTLXFER"
        case 0xcbbc: return "X_BELL"
        case 0xcbc3: return "BELL2"
        case 0xcbcf: return "WAIT"
        case 0xcbd0: return "WAIT2"
        case 0xcbd1: return "WAIT3"
        case 0xcbdb: return "X_BS"
        case 0xcbe2: return "BS40"
        case 0xcbeb: return "BSDONE"
        case 0xcbec: return "X_CR"
        case 0xcbfd: return "X_CRPAS"
        case 0xcc0c: return "X_CRRET"
        case 0xcc0d: return "X_EM"
        case 0xcc1a: return "X_SUB"
        case 0xcc1d: return "X_SUB80"
        case 0xcc1f: return "X_SUBLP"
        case 0xcc26: return "X_FS"
        case 0xcc33: return "X_FSRET"
        case 0xcc34: return "X_US"
        case 0xcc40: return "X_US1"
        case 0xcc45: return "X_US2"
        case 0xcc48: return "X_USRET"
        case 0xcc49: return "X_SO"
        case 0xcc52: return "X_SI"
        case 0xcc59: return "STUFFINV"
        case 0xcc5f: return "CTLADL"
        case 0xcc78: return "CTLADH"
        case 0xcc91: return "X_LF"
        case 0xcc9e: return "X_LF2"
        case 0xcca4: return "SCROLLUP"
        case 0xccaa: return "SCROLLDN"
        case 0xccae: return "SCROLL1"
        case 0xccb8: return "SCROLL2"
        case 0xccd1: return "SCRLSUB"
        case 0xccdd: return "MSCRL0"
        case 0xcce1: return "MSCRL1"
        case 0xccf9: return "MSCRL2"
        case 0xcd02: return "MSCRLRET"
        case 0xcd09: return "ONEMORE"
        case 0xcd10: return "MSCRLRTS"
        case 0xcd11: return "S_SCRLRET"
        case 0xcd17: return "X_SCRLRET2"
        case 0xcd20: return "X_LFRET"
        case 0xcd23: return "X_VT"
        case 0xcd2c: return "X_VTLOOP"
        case 0xcd32: return "X_VTNEXT"
        case 0xcd42: return "X_FF"
        case 0xcd48: return "X_GS"
        case 0xcd4e: return "X_GSEOLZ"
        case 0xcd54: return "X_GS2"
        case 0xcd59: return "X_DC1"
        case 0xcd64: return "X_DC1B"
        case 0xcd76: return "X_DC1RTS"
        case 0xcd77: return "X_DCI2"
        case 0xcd88: return "X_DC2B"
        case 0xcd90: return "X_NAK"
        case 0xcd9a: return "X_DC2RET"
        case 0xcd9b: return "FULL80"
        case 0xcdaa: return "QUIT"
        case 0xcdc0: return "QUIT2"
        case 0xcddb: return "SCRN84"
        case 0xcdea: return "SCR40"
        case 0xce01: return "SCR40RET"
        case 0xce0a: return "ATEFOR"
        case 0xce13: return "ATEFOR1"
        case 0xce22: return "GET84"
        case 0xce32: return "SCRN48"
        case 0xce3e: return "SCR80"
        case 0xce55: return "SCR80RET"
        case 0xce58: return "SCRNRET"
        case 0xce63: return "FORATE"
        case 0xce6f: return "FORATE1"
        case 0xce91: return "CLRHALF"
        case 0xce9b: return "CLRHALF2"
        case 0xcea3: return "DO48"
        case 0xceaf: return "SETCH"
        case 0xced9: return "SETCHRTS"
        case 0xcedd: return "INVERT"
        case 0xcef2: return "STORCHAR"
        case 0xcef9: return "LCEF9"
        case 0xcf00: return "SEV"
        case 0xcf01: return "PICK"
        case 0xcf06: return "SCREENINIT"
        case 0xcf1e: return "SCRN2"
        case 0xcf2a: return "STOR80"
        case 0xcf37: return "SCRN3"
        case 0xcf40: return "SCRN40"
        case 0xcf4a: return "STOR40"
        case 0xcf4e: return "STPKEXIT"
        case 0xcf52: return "ESCON"
        case 0xcf65: return "ESCOFF"
        case 0xcf6e: return "ESCRET"
        case 0xcf78: return "COPYROM"
        case 0xcf95: return "COPYROM2"
        case 0xcfb3: return "LCB2ROM"
        case 0xcfb9: return "LCB1"
        case 0xcfc2: return "LCFC2"
        case 0xcfc5: return "COPYRET"
        case 0xcfc8: return "PSETUP"
        case 0xcfd2: return "PSETUP2"
        case 0xcfdf: return "PSETUPRET"
        case 0xcfea: return "F_TABLE"
        case 0xcff0: return "PLUSMINUS1"
        case 0xcff3: return "B_TABLE"
        case 0xcff9: return "WNDTAB"
        case 0xcffd: return "ZZEND"

        // symbols from F000 ROM
        case 0xf800: return "PLOT"
        case 0xf80c: return "RTMASK"
        case 0xf80e: return "PLOT1"
        case 0xf819: return "HLINE"
        case 0xf81c: return "HLINE1"
        case 0xf826: return "VLINEZ"
        case 0xf828: return "VLINE"
        case 0xf831: return "RTS1"
        case 0xf832: return "CLRSCR"
        case 0xf836: return "CLRTOP"
        case 0xf838: return "CLRSC2"
        case 0xf83c: return "CLRSC3"
        case 0xf847: return "GBASCALC"
        case 0xf856: return "GBCALC"
        case 0xf85f: return "NXTCOL"
        case 0xf864: return "SETCOL"
        case 0xf871: return "SCRN"
        case 0xf879: return "SCRN2"
        case 0xf87f: return "RTMSKZ"
        case 0xf882: return "INSDS1"
        case 0xf88e: return "INSDS2"
        case 0xf89b: return "IEVEN"
        case 0xf8a5: return "ERR"
        case 0xf8a9: return "GETFMT"
        case 0xf8be: return "MNNDX1"
        case 0xf8c2: return "MNNDX2"
        case 0xf8c9: return "MNNDX3"
        case 0xf8d0: return "INSTDSP"
        case 0xf8d4: return "PRNTOP"
        case 0xf8db: return "PRNTBL"
        case 0xf8f5: return "PRMN1"
        case 0xf8f9: return "PRMN2"
        case 0xf910: return "PRADR1"
        case 0xf914: return "PRADR2"
        case 0xf926: return "PRADR3"
        case 0xf92a: return "PRADR4"
        case 0xf930: return "PRADR5"
        case 0xf938: return "RELADR"
        case 0xf940: return "PRNTYX"
        case 0xf941: return "PRNTAX"
        case 0xf944: return "PRNTX"
        case 0xf948: return "PRBLNK"
        case 0xf94a: return "PRBL2"
        case 0xf94c: return "PRBL3"
        case 0xf953: return "PCADJ"
        case 0xf954: return "PCADJ2"
        case 0xf956: return "PCADJ3"
        case 0xf95c: return "PCADJ4"
        case 0xf961: return "RTS2"
        case 0xf962: return "FMT1"
        case 0xf9a6: return "FMT2"
        case 0xf9b4: return "CHAR1"
        case 0xf9ba: return "CHAR2"
        case 0xf9c0: return "MNEML"
        case 0xfa00: return "MNEMR"
        case 0xfa40: return "IRQ"
        case 0xfa4c: return "BREAK"
        case 0xfa59: return "OLDBRK"
        case 0xfa62: return "RESET"
        case 0xfa6f: return "INITAN"
        case 0xfa81: return "NEWMON"
        case 0xfa9b: return "FIXSEV"
        case 0xfaa3: return "NOFIX"
        case 0xfaa6: return "PWRUP"
        case 0xfaab: return "SETPLP"
        case 0xfaba: return "SLOOP"
        case 0xfac7: return "NXTBYT"
        case 0xfad7: return "REGDSP"
        case 0xfada: return "RGDSP1"
        case 0xfae4: return "RDSP1"
        case 0xfafd: return "PWRCON"
        case 0xfb02: return "DSKID"
        case 0xfb09: return "TITLE"
        case 0xfb11: return "XLTBL"
        case 0xfb19: return "RTBL"
        case 0xfb1e: return "PREAD"
        case 0xfb25: return "PREAD2"
        case 0xfb2e: return "RTS2D"
        case 0xfb2f: return "INIT"
        case 0xfb39: return "SETTXT"
        case 0xfb40: return "SETGR"
        case 0xfb4b: return "SETWND"
        case 0xfb60: return "APPLEII"
        case 0xfb65: return "STITLE"
        case 0xfb6f: return "SETPWRC"
        case 0xfb78: return "VIDWAIT"
        case 0xfb88: return "KBDWAIT"
        case 0xfb94: return "NOWAIT"
        case 0xfb97: return "ESCOLD"
        case 0xfb9b: return "ESCNOW"
        case 0xfba5: return "ESCNEW"
        case 0xfbb3: return "VERSION"
        case 0xfbb4: return "GOTOCX"
        case 0xfbc1: return "BASCALC"
        case 0xfbd0: return "BSCLC2"
        case 0xfbd9: return "BELL1"
        case 0xfbe4: return "BELL2"
        case 0xfbef: return "RTS2B"
        case 0xfbf0: return "STOADV"
        case 0xfbf4: return "ADVANCE"
        case 0xfbfc: return "RTS3"
        case 0xfbfd: return "VIDOUT"
        case 0xfc10: return "BS"
        case 0xfc1a: return "UP"
        case 0xfc22: return "VTAB"
        case 0xfc24: return "VTABZ"
        case 0xfc2b: return "RTS4"
        case 0xfc2c: return "ESC1"
        case 0xfc42: return "CLREOP"
        case 0xfc58: return "HOME"
        case 0xfc62: return "CR"
        case 0xfc66: return "LF"
        case 0xfc70: return "SCROLL"
        case 0xfc72: return "XGOTOCX"
        case 0xfc84: return "RDCX"
        case 0xfc91: return "ISSLOTS"
        case 0xfc99: return "ISPAGE1"
        case 0xfc9c: return "CLREOL"
        case 0xfc9e: return "CLREOLZ"
        case 0xfca8: return "WAIT"
        case 0xfca9: return "WAIT2"
        case 0xfcaa: return "WAIT3"
        case 0xfcb4: return "NXTA4"
        case 0xfcba: return "NXTA1"
        case 0xfcc8: return "RTS4B"
        case 0xfcc9: return "HEADR"
        case 0xfcd6: return "WRBIT"
        case 0xfcdb: return "ZERDLY"
        case 0xfce2: return "ONEDLY"
        case 0xfce5: return "WRTAPE"
        case 0xfcec: return "RDBYTE"
        case 0xfcee: return "RDBYT2"
        case 0xfcfa: return "RD2BIT"
        case 0xfcfd: return "RDBIT"
        case 0xfd0c: return "RDKEY"
        case 0xfd1b: return "KEYIN"
        case 0xfd21: return "RDESC"
        case 0xfd2f: return "ESC"
        case 0xfd35: return "RDCHAR"
        case 0xfd3d: return "NOTCR"
        case 0xfd5f: return "NOTCR1"
        case 0xfd62: return "CANCEL"
        case 0xfd67: return "GETLNZ"
        case 0xfd6a: return "GETLN"
        case 0xfd71: return "BCKSPC"
        case 0xfd75: return "NXTCHAR"
        case 0xfd7e: return "CAPTST"
        case 0xfd84: return "ADDINP"
        case 0xfd8e: return "CROUT"
        case 0xfd92: return "PRA1"
        case 0xfd96: return "PRYX2"
        case 0xfda3: return "XAM8"
        case 0xfdad: return "MOD8CHK"
        case 0xfdb3: return "XAM"
        case 0xfdb6: return "DATACUT"
        case 0xfdc5: return "RTS4C"
        case 0xfdc6: return "XAMPM"
        case 0xfdd1: return "ADD"
        case 0xfdda: return "PRBYTE"
        case 0xfde3: return "PRHEX"
        case 0xfde5: return "PRHEXZ"
        case 0xfded: return "COUT"
        case 0xfdf0: return "COUT1"
        case 0xfdf6: return "COUTZ"
        case 0xfe00: return "BL1"
        case 0xfe04: return "BLANK"
        case 0xfe0b: return "STOR"
        case 0xfe17: return "RTS5"
        case 0xfe18: return "SETMODE"
        case 0xfe1d: return "SETMDZ"
        case 0xfe20: return "LT"
        case 0xfe22: return "LT2"
        case 0xfe2c: return "MOVE"
        case 0xfe36: return "VFY"
        case 0xfe58: return "VFYOK"
        case 0xfe5e: return "LIST"
        case 0xfe63: return "LIST2"
        case 0xfe75: return "A1PC"
        case 0xfe78: return "A1PCLP"
        case 0xfe7f: return "A1PCRTS"
        case 0xfe80: return "SETINV"
        case 0xfe84: return "SETNORM"
        case 0xfe86: return "SETIFLG"
        case 0xfe89: return "SETKBD"
        case 0xfe8b: return "INPORT"
        case 0xfe8d: return "INPRT"
        case 0xfe93: return "SETVID"
        case 0xfe95: return "OUTPORT"
        case 0xfe97: return "OUTPRT"
        case 0xfe9b: return "IOPRT"
        case 0xfea7: return "IOPRT1"
        case 0xfea9: return "IOPRT2"
        case 0xfeaf: return "CKSUMFIX"
        case 0xfeb0: return "XBASIC"
        case 0xfeb3: return "BASCONT"
        case 0xfeb6: return "GO"
        case 0xfebf: return "REGZ"
        case 0xfec2: return "TRACE"
        case 0xfec4: return "STEPZ"
        case 0xfeca: return "USR"
        case 0xfecd: return "WRITE"
        case 0xfed4: return "WR1"
        case 0xfeed: return "WRBYTE"
        case 0xfeef: return "WRBYT2"
        case 0xfef6: return "CRMON"
        case 0xfefd: return "READ"
        case 0xff0a: return "RD2"
        case 0xff16: return "RD3"
        case 0xff2d: return "PRERR"
        case 0xff3a: return "BELL"
        case 0xff3f: return "RESTORE"
        case 0xff44: return "RESTR1"
        case 0xff4a: return "SAVE"
        case 0xff4c: return "SAV1"
        case 0xff59: return "OLDRST"
        case 0xff65: return "MON"
        case 0xff69: return "MONZ"
        case 0xff73: return "NXTITM"
        case 0xff7a: return "CHRSRCH"
        case 0xff8a: return "DIG"
        case 0xff90: return "NXTBIT"
        case 0xff98: return "NXTBAS"
        case 0xffa2: return "NXTBS2"
        case 0xffa7: return "GETNUM"
        case 0xffad: return "NXTCHR"
        case 0xffbe: return "TOSUB"
        case 0xffc7: return "ZMODE"
        case 0xffcc: return "CHRTBL"
        case 0xffe3: return "SUBTBL"


       // default: return value.toString(16);
        default: return "";
      }
  }
}