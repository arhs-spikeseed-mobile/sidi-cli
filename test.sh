#!/usr/bin/env bash
# fail if any commands fails
set -ex
END_TO_END_BUILD_LIST="62a1a5bc0f852b69e688478d+62a1a5bc0f852b8f914f24d3+62a1a5bc0a17ac397de474f8+62a1a5bc0f852b69e6884790+62a1a5bc0f852b8f914f24d6+62a1a5bc0f852beb5580cea6+62a1be010f852b3dded9e8a0+62a1be010a17ac5f7f7fb926+62a1be010f852b25bbd304e9+62a1be010a17acbd7af544b5+62a1be010a17accf1613d9c1+62a1be010a17ac5f7f7fb929+62a1d7840f852bf8fbffeca1+62a1d7840a17ac6a60baf197+62a1d7840a17ac6a60baf19a+62a1d7840a17aca9261a4ae8+62a1d7840f852b163e751073+62a1d7840a17aca9261a4aeb+62a1f5940f852b116bf874dd+62a1f5940f852b116bf874e0+62a1f5940f852bd7d6a4edcd+62a1f5940a17acba00e15df4+62a1f5940a17ac408dcb830b+62a1f5940a17ac8c964190dc+62a219f40f852b55a8c85d53+62a219f50f852b4a12c049e5+62a219f50a17acfacd46093e+62a219f50a17aca0c590951e+62a219f50a17accd7bd69e9e+62a219f50a17ac7e660868b8+62a219f40f852b55a8c85d53+62a219f50f852b4a12c049e5+62a219f50a17acfacd46093e+62a219f50a17aca0c590951e+62a219f50a17accd7bd69e9e+62a219f50a17ac7e660868b8"
END_TO_END_BUILD_LIST="62a7aefc93ecd5f6775920f7+62a7aefc93ecd502530bb316+62a7aefc2b104021e6a0a7ec+62a7aefc2b10402055a7148a+62a7aefc93ecd502530bb31a+62a7aefd2b10402055a7148d+62a7cd532b104032f92c75bb+62a7cd532b10408d22ab5f31+62a7cd5393ecd5249c409d22+62a7cd532b1040aa9e680cf6+62a7cd532b10409f33d54aa3+62a7cd532b10401dcdb3eea2+62a7e7552b1040aebbe5a2ce+62a7e7552b1040435e475b2d+62a7e7552b1040a56c3e0436+62a7e7552b1040bb9b35ff5c+62a7e7552b1040abe02813e9+62a7e7552b1040a56c3e0439+62a803ed93ecd5c8abf59ae6+62a803ed93ecd5048f7d0d92+62a803ed2b1040ff8e52d893+62a803ee93ecd57f28d3fa60+62a803ee93ecd5048f7d0d97+62a803ee2b10405f8aee0608+62a82c4e93ecd50a69ea2a6c+62a82c4e93ecd59c3d1f4bf0+62a82c4e93ecd5ca0a4a19f3+62a82c4e93ecd50a69ea2a6f+62a82c4e93ecd595bc0efe5e+62a82c4e93ecd5ca0a4a19f7"

CODE_MAGIC_TOKEN="Cg2D_4CiNDl19DnYzrwujnWOGRaf_ZXsChxps3dslo0"
END_TO_END_COLLECT_ARTIFACTS="po"

if [[ "$END_TO_END_COLLECT_ARTIFACTS" != "" ]]; then
  echo "Collects results on builds: $END_TO_END_BUILD_LIST..."
  export IFS="+"
  for build_slug in $END_TO_END_BUILD_LIST; do
    echo "Retrieve from $build_slug..."

    # Fetch info about the artifact
    END_TO_END_RESULTS_S3=$(curl -H "Content-Type: application/json" -H "x-auth-token: $CODE_MAGIC_TOKEN" --request GET "https://api.codemagic.io/builds/$build_slug" | jq '.build | .artefacts[] | select(.name == "end_to_end_results.zip") | .url' | sed 's/"//g')
    echo "Request to downlad atifacts: $END_TO_END_RESULTS_S3"

    if [[ "$END_TO_END_RESULTS_S3" != "" ]]; then
      curl -o ./build/reports/"$build_slug".zip "$END_TO_END_RESULTS_S3"

      # delete .gitkeep files
      find . -name \*.gitkeep -type f -delete
      # unzip reports
      unzip -q -o "./build/reports/$build_slug.zip"

#      rm ./build/reports/"$build_slug".zip
    fi
  done

  echo "SUCCESS"
fi
