declare module 'occt-import-js' {
  export interface OCCTMesh {
    attributes: {
      position: { array: Float32Array };
      normal?: { array: Float32Array };
    };
    index?: { array: Uint32Array };
    color?: number[];
  }

  export interface OCCTResult {
    success: boolean;
    meshes: OCCTMesh[];
  }

  export interface OCCTInstance {
    ReadStepFile: (data: Uint8Array, params: any) => OCCTResult;
  }

  export default function occtimportjs(options?: {
    locateFile?: (path: string, scriptDirectory: string) => string;
  }): Promise<OCCTInstance>;
}
