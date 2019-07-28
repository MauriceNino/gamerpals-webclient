export interface IParameterPossibility {
    possibilityName: string;
    possibilityValue: any;
}

export interface ISearchParameter {
    _id: any; // ObjectId
    parameterName: string;
    parameterGrayText: string;
    parameterHint: string;
    parameterType: string;
    parameterValueFrom: any;
    parameterValueTo: any;
    parameterValue: any;
    parameterPossibilities: IParameterPossibility[];
}

export interface IUserSearchParameter {
    parameter: any; // ObjectId
    valueFrom: number;
    valueTo: number;
}
