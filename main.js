// https://xboxdevwiki.net/Xbe

var imageHeader = struct({
    Magic: struct({
        Byte0: char(),
        Byte1: char(),
        Byte2: char(),
        Byte3: char()
    }),
    Signature: array(uint8(), 0x100),
    BaseAddress: uint32(),
    SizeOfHeaders: uint32(),
    SizeOfImage: uint32(),
    SizeOfImageHeader: uint32(),
    TimeDate: uint32(),
    CertificateAddress: uint32(),
    NumberOfSections: uint32(),
    SectionHeadersAddress: uint32(),
    InitializationFlags: struct({
        MountUtilityDrive: bitfield("bool", 1).set({name: "Mount utility drive"}),
        FormatUtilityDrive: bitfield("bool", 1).set({name: "Format utility drive"}),
        Limit64Megs: bitfield("bool", 1).set({name: "Limit RAM to 64 megs"}),
        DontSetupHarddisk: bitfield("bool", 1).set({name: "Do not setup harddrive"}),
        Reserved: bitfield("bool", 28)
    }),
    EntryPoint: uint32(),
    TLSAddress: uint32(),
    StackSize: uint32(),
    PEHeapReserve: uint32(),
    PEHeapCommit: uint32(),
    PEBaseAddress: uint32(),
    PESizeOfImage: uint32(),
    PEChecksum: uint32(),
    PETimeDate: uint32(),
    DebugPathNameAddress: uint32(),
    DebugFileNameAddress: uint32(),
    DebugFilenameUTF16Address: uint32(),
    KernelImageThunkAddress: uint32(),
    ImportDirectoryAddress: uint32(),
    NumberOfLibraryVersions: uint32(),
    LibraryVersionsAddress: uint32(),
    KernelLibraryVersionAddress: uint32(),
    XAPILibraryVersionAddress: uint32(),
    LogoBitmapAddress: uint32(),
    LogoBitmapSize: uint32()
}).setValidation(validateImageHeader);

function validateImageHeader(root) {
    var ret = true;
    var magic = this.Magic;
    if (magic.Byte0.uint8 != 0x58) {
        magic.Byte0.validationError = "Must == 0x58";
        ret = false;
    }
    if (magic.Byte1.uint8 != 0x42) {
        magic.Byte1.validationError = "Must == 0x42";
        ret = false;
    }
    if (magic.Byte2.uint8 != 0x45) {
        magic.Byte1.validationError = "Must == 0x45";
        ret = false;
    }
    if (magic.Byte3.uint8 != 0x48) {
        magic.Byte1.validationError = "Must == 0x48";
        ret = false;
    }

    return ret;
}

function init() {
    var header = struct({
        ImageHeader: imageHeader
    });

    return header;
}

